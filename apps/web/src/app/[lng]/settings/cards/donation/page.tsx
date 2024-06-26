'use client';
import Countdown from '@/components/Countdown/Countdown';
import Navbar from '@/components/Layout/Navbar';
import { Modal } from '@/components/UI';
import { useNotifications } from '@/context/NotificationsContext';
import { useTranslations } from 'next-intl';
import { buildCardTransferAcceptEvent, nowInSeconds, useWalletContext } from '@lawallet/react';
import { requestCardActivation } from '@lawallet/react/actions';
import { Button, Flex, Text } from '@lawallet/ui';
import { NostrEvent } from '@nostr-dev-kit/ndk';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

type EventDonationInfo = {
  event: NostrEvent | undefined;
  timeLeft: number;
  encoded: string;
};

const page = () => {
  const [eventInfo, setEventInfo] = useState<EventDonationInfo>({
    event: undefined,
    timeLeft: 0,
    encoded: '',
  });
  const t = useTranslations();

  const notifications = useNotifications();
  const router = useRouter();
  const params = useSearchParams();
  const {
    account: { identity },
  } = useWalletContext();

  const handleAcceptCardTransfer = () => {
    try {
      const event: NostrEvent = JSON.parse(atob(eventInfo.encoded));
      buildCardTransferAcceptEvent(event.pubkey, event, identity.data.privateKey).then((buildedEvent) => {
        requestCardActivation(buildedEvent).then((res) => {
          notifications.showAlert({
            title: '',
            description: !res ? t('ACTIVATE_ERROR') : t('ACTIVATE_SUCCESS'),
            type: !res ? 'error' : 'success',
          });

          router.push('/settings/cards');
        });
      });
    } catch {
      return;
    }
  };

  useEffect(() => {
    const encodedEvent: string = params.get('event') ?? '';
    if (!encodedEvent || !identity.data.privateKey) return;

    try {
      const event: NostrEvent = JSON.parse(atob(encodedEvent));
      if (event) {
        const timeLeft = 180 - (nowInSeconds() - event.created_at);
        if (timeLeft <= 0) {
          throw Error('Expired event');
        }

        setEventInfo({
          event,
          timeLeft,
          encoded: encodedEvent,
        });
      }
    } catch {
      router.push('/settings/cards');
    }
  }, [identity.data.privateKey]);

  return (
    <>
      <Navbar showBackPage={true} title={'Recibir tarjeta'} overrideBack="/settings/cards" />

      <Modal
        title={t('NEW_CARD')}
        isOpen={Boolean(eventInfo.encoded.length)}
        onClose={() => router.push('/settings/cards')}
      >
        <Text>{t('DETECT_NEW_CARD')}</Text>
        <Flex flex={1} direction="column" align="center" justify="center" gap={8}>
          <Text>{t('TIME_LEFT')}</Text>
          {eventInfo.event && <Countdown seconds={eventInfo.timeLeft} />}
        </Flex>
        <Flex direction="column" gap={4}>
          <Flex>
            <Button onClick={handleAcceptCardTransfer}>{t('ACTIVATE_CARD')}</Button>
          </Flex>
          <Flex>
            <Button variant="borderless" onClick={() => router.push('/settings/cards')}>
              {t('CANCEL')}
            </Button>
          </Flex>
        </Flex>
      </Modal>
    </>
  );
};

export default page;
