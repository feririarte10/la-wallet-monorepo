'use client';

import Navbar from '@/components/Layout/Navbar';
import { Button, Flex, Modal, Text } from '@/components/UI';
import QrScanner from '@/components/UI/Scanner/Scanner';
import { regexURL } from '@/constants/constants';
import { useTranslation } from '@/context/TranslateContext';
import { TransferTypes } from '@lawallet/react/types';
import { detectTransferType, removeLightningStandard, useConfig } from '@lawallet/react';
import { useRouter } from 'next/navigation';
import NimiqQrScanner from 'qr-scanner';
import { useState } from 'react';

export default function Page() {
  const [urlScanned, setUrlScanned] = useState<string>('');
  const { t } = useTranslation();
  const router = useRouter();
  const config = useConfig();

  const handleScanURL = (str: string) => {
    const url = new URL(str);
    const cardParameter = url.searchParams.get('c');

    if (cardParameter) {
      router.push(`/cards?c=${cardParameter}`);
      return;
    } else {
      setUrlScanned(str);
    }
  };

  const handleScan = (result: NimiqQrScanner.ScanResult) => {
    if (!result || !result.data) return;

    const isURL: boolean = regexURL.test(result.data);

    if (isURL) {
      handleScanURL(result.data);
      return;
    } else {
      const cleanScan: string = removeLightningStandard(result.data);
      const scanType: TransferTypes = detectTransferType(cleanScan, config);
      if (scanType === TransferTypes.NONE) return;

      if (scanType === TransferTypes.INVOICE) {
        router.push(`/transfer/invoice/${result.data.toLowerCase()}`);
        return;
      }

      router.push(`/transfer/lnurl?data=${result.data.toLowerCase()}`);
    }
  };

  return (
    <>
      <Navbar showBackPage={true} title={t('SCAN_QR')} />

      <Flex justify="center" align="center" flex={1}>
        <QrScanner
          onDecode={handleScan}
          startOnLaunch={true}
          highlightScanRegion={true}
          highlightCodeOutline={true}
          constraints={{ facingMode: 'environment' }}
          preferredCamera={'environment'}
        />
      </Flex>

      <Modal title={t('URL_SCANNED_TITLE')} isOpen={Boolean(urlScanned.length)} onClose={() => null}>
        <Text>{t('URL_SCANNED_DESC', { url: urlScanned })}</Text>
        <Flex direction="column" gap={4}>
          <Flex>
            <Button onClick={() => window.open(urlScanned)}>{t('OPEN_URL')}</Button>
          </Flex>
          <Flex>
            <Button variant="borderless" onClick={() => setUrlScanned('')}>
              {t('CANCEL')}
            </Button>
          </Flex>
        </Flex>
      </Modal>
    </>
  );
}
