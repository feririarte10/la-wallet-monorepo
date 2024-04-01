import { ADMIN_SIGNUP_KEY, msats_signupPrice, signupRelays } from '@/constants/buyAddress';
import { initializeNDK, signNdk } from '@/utils/ndk';
import { baseConfig, buildCreateNonceEvent, decodeInvoice, getTagValue } from '@lawallet/react';
import { DecodedInvoiceReturns } from '@lawallet/react/types';
import NDK, { NDKEvent, NDKPrivateKeySigner, NostrEvent } from '@nostr-dev-kit/ndk';
import { NextResponse } from 'next/server';
import { Event, getPublicKey, nip04, validateEvent, verifySignature } from 'nostr-tools';

export async function POST(request: Request) {
  if (!ADMIN_SIGNUP_KEY.length) return NextResponse.json({ data: 'Missing admin key' }, { status: 401 });

  try {
    const zapReceipt = await request.json();
    if (!zapReceipt) return NextResponse.json({ data: 'Missing zap receipt event' }, { status: 401 });

    if (!verifySignature(zapReceipt as Event) || zapReceipt.pubkey !== baseConfig.modulePubkeys.urlx)
      throw new Error('Invalid signature');

    const buyRequestId: string = getTagValue(zapReceipt.tags, 'e');
    const payedInvoice: string = getTagValue(zapReceipt.tags, 'bolt11');
    const decodedInvoice: DecodedInvoiceReturns | undefined = decodeInvoice(payedInvoice);

    if (!validateEvent(zapReceipt) || !buyRequestId || !decodedInvoice) throw new Error('Malformed event');
    if (Number(decodedInvoice.millisatoshis) !== msats_signupPrice) throw new Error('Insufficient payment');

    const adminPubkey: string = getPublicKey(ADMIN_SIGNUP_KEY);
    const ndk: NDK = await initializeNDK(signupRelays, new NDKPrivateKeySigner(ADMIN_SIGNUP_KEY));

    const buyRequestEvent: NDKEvent | null = await ndk.fetchEvent({ ids: [buyRequestId], authors: [adminPubkey] });
    if (!buyRequestEvent) throw new Error('Invalid buy request event');

    const decryptedNonce: string = await nip04.decrypt(ADMIN_SIGNUP_KEY, adminPubkey, buyRequestEvent.content);
    const createNonceEvent: NostrEvent = await signNdk(ndk, buildCreateNonceEvent(adminPubkey, decryptedNonce));

    const nonceResponse = await fetch(`${baseConfig.endpoints.lightningDomain}/api/nonce/create`, {
      method: 'POST',
      body: JSON.stringify(createNonceEvent),
    });

    const nonce = nonceResponse.json();
    return NextResponse.json({ data: { nonce } }, { status: 200 });
  } catch (e: unknown) {
    return NextResponse.json({ data: (e as Error).message }, { status: 422 });
  }
}
