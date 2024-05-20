'use client';

import Navbar from '@/components/Layout/Navbar';
import { useMemo, useState } from 'react';

import { copy } from '@/utils/share';

import { QRCode } from '@/components/UI';
import { Button, Container, Divider, Flex, Text } from '@lawallet/ui';

import { appTheme } from '@/config/exports';
import { useNotifications } from '@/context/NotificationsContext';
import { formatAddress, lnurl_encode, useConfig, useWalletContext } from '@lawallet/react';
import { useTranslations } from 'next-intl';
import InvoiceSheet from './components/InvoiceSheet';

export default function Page() {
  const config = useConfig();
  const t = useTranslations();
  const notifications = useNotifications();
  const {
    account: { identity },
  } = useWalletContext();

  const [isOpenSheet, setIsOpenSheet] = useState<boolean>(false);

  const handleCopy = (text: string) => {
    copy(text).then((res) => {
      notifications.showAlert({
        description: res ? t('SUCCESS_COPY') : t('ERROR_COPY'),
        type: res ? 'success' : 'error',
      });
    });
  };

  const LNURLEncoded: string = useMemo(
    () =>
      lnurl_encode(
        `${config.endpoints.lightningDomain}/.well-known/lnurlp/${
          identity.username ? identity.username : identity.npub
        }`,
      ).toUpperCase(),
    [identity],
  );

  return (
    <>
      <Navbar showBackPage={true} title={t('DEPOSIT')} />

      {identity.username.length ? (
        <>
          <Flex flex={1} justify="center" align="center">
            <QRCode
              size={300}
              borderSize={30}
              value={('lightning:' + LNURLEncoded).toUpperCase()}
              textToCopy={identity.lud16}
            />
          </Flex>
          <Flex>
            <Container size="small">
              <Divider y={16} />

              <Flex align="center">
                <Flex direction="column">
                  <Text size="small" color={appTheme.colors.gray50}>
                    {t('USER')}
                  </Text>
                  <Flex>
                    <Text>{identity.lud16 ? identity.lud16 : formatAddress(LNURLEncoded, 20)}</Text>
                  </Flex>
                </Flex>
                <div>
                  <Button
                    size="small"
                    variant="bezeled"
                    onClick={() => handleCopy(identity.lud16 ? identity.lud16 : LNURLEncoded)}
                  >
                    {t('COPY')}
                  </Button>
                </div>
              </Flex>

              <Divider y={16} />
            </Container>
          </Flex>

          <Flex>
            <Container size="small">
              <Divider y={16} />
              <Flex gap={8}>
                <Button
                  variant="bezeled"
                  onClick={() => {
                    setIsOpenSheet(true);
                  }}
                >
                  {t('CREATE_INVOICE')}
                </Button>
              </Flex>
              <Divider y={32} />
            </Container>
          </Flex>
        </>
      ) : null}

      <InvoiceSheet isOpen={isOpenSheet} onClose={() => setIsOpenSheet(false)} handleCopy={handleCopy} />
    </>
  );
}
