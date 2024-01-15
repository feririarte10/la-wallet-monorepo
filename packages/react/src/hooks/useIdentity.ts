import { parseContent } from '@lawallet/utils';
import { getUsername } from '@lawallet/utils/actions';
import { defaultIdentity, type UserIdentity } from '@lawallet/utils/types';
import { getPublicKey, nip19 } from 'nostr-tools';
import { useEffect, useState, type Dispatch, type SetStateAction } from 'react';
import { STORAGE_IDENTITY_KEY } from '../constants/constants.js';
import { useConfig } from './useConfig.js';
import type { ConfigParameter } from '../types/config.js';

export interface UseIdentityReturns {
  identity: UserIdentity;
  loadIdentityFromPubkey: (pubkey: string) => void;
  loadIdentityFromPrivateKey: (privkey: string) => void;
}

export type UseIdentityParameters = ConfigParameter & { pubkey?: string };

export const useIdentity = (params: UseIdentityParameters): UseIdentityReturns => {
  const config = useConfig(params);
  const [identity, setIdentity] = useState<UserIdentity>(defaultIdentity);

  const setDefaultIdentity = () => {
    setIdentity({
      ...defaultIdentity,
      isReady: true,
    });
  };

  const loadIdentityFromPubkey = async (pub: string) => {
    const username: string = await getUsername(pub, config);
    setIdentity({
      ...identity,
      username,
      hexpub: pub,
      isReady: true,
    });
  };

  const loadIdentityFromPrivateKey = async (privkey: string) => {
    if (!privkey.length) {
      setIdentity({ ...defaultIdentity, isReady: true });
      return;
    }

    const pubkey: string = getPublicKey(privkey);
    const username: string = await getUsername(pubkey, config);

    setIdentity({
      username,
      hexpub: pubkey,
      npub: nip19.npubEncode(pubkey),
      privateKey: privkey,
      isReady: true,
    });
  };

  const loadIdentityFromStorage = async () => {
    const storageIdentity = localStorage.getItem(STORAGE_IDENTITY_KEY);
    if (!storageIdentity) return setDefaultIdentity();

    const parsedIdentity: UserIdentity = parseContent(storageIdentity);
    if (!parsedIdentity.privateKey) return setDefaultIdentity();

    const hexpub: string = getPublicKey(parsedIdentity.privateKey);
    const username: string = await getUsername(hexpub, config);

    if (hexpub === parsedIdentity.hexpub && username == parsedIdentity.username) {
      setIdentity({
        ...parsedIdentity,
        isReady: true,
      });
    } else {
      setIdentity({
        ...parsedIdentity,
        hexpub,
        username,
        isReady: true,
      });
    }

    return;
  };

  useEffect(() => {
    params.pubkey ? loadIdentityFromPubkey(params.pubkey) : loadIdentityFromStorage();
  }, [params.pubkey]);

  return {
    identity,
    loadIdentityFromPubkey,
    loadIdentityFromPrivateKey,
  };
};
