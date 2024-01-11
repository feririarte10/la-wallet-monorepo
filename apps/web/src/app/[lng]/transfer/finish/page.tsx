"use client";

import { SatoshiV2Icon } from "@bitcoin-design/bitcoin-icons-react/filled";

import Container from "@/components/Layout/Container";
import Navbar from "@/components/Layout/Navbar";
import {
  Avatar,
  Confetti,
  Divider,
  Flex,
  Heading,
  Icon,
  LinkButton,
  Text,
} from "@/components/UI";
import { useTransferContext } from "@/context/TransferContext";
import { useTranslation } from "@/context/TranslateContext";
import { formatAddress, formatToPreference } from "@lawallet/react";
import { splitHandle } from "@lawallet/react/utils";
import { TransferTypes } from "@lawallet/react/types";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import { useWalletContext } from "@lawallet/react";

export default function Page() {
  const { lng, t } = useTranslation();
  const {
    settings: {
      props: { currency },
    },
    converter: { pricesData, convertCurrency },
  } = useWalletContext();

  const { transferInfo } = useTransferContext();

  const convertedAmount: string = useMemo(() => {
    const convertion: number = convertCurrency(
      transferInfo.amount,
      "SAT",
      currency,
    );

    return formatToPreference(currency, convertion, lng);
  }, [pricesData]);

  const router = useRouter();
  const [transferUsername, transferDomain] = splitHandle(transferInfo.data);
  if (!transferInfo.data) router.push("/dashboard");

  return (
    <>
      <Navbar />

      <Container size="small">
        <Confetti />
        <Divider y={16} />
        <Heading>{t("FINISH_TRANSFER_TITLE")}</Heading>
        <Divider y={4} />
        <Text size="small">
          {transferInfo.type === TransferTypes.LNURLW
            ? t("SUCCESS_CLAIM")
            : t("TRANSFER_TO")}
        </Text>
        <Divider y={24} />
        <Flex align="center" gap={8}>
          <Avatar size="large">
            <Text size="small">
              {transferUsername.substring(0, 2).toUpperCase()}
            </Text>
          </Avatar>
          {transferInfo.type === TransferTypes.LNURLW ||
          transferInfo.type === TransferTypes.INVOICE ? (
            <Text>{formatAddress(transferInfo.data, 25)}</Text>
          ) : (
            <Text>
              {transferUsername}@{transferDomain}
            </Text>
          )}
        </Flex>
        <Divider y={24} />
        {Number(convertedAmount) !== 0 ? (
          <Flex align="center" justify="center" gap={4}>
            {currency === "SAT" ? (
              <Icon size="small">
                <SatoshiV2Icon />
              </Icon>
            ) : (
              <Text>$</Text>
            )}
            <Heading>{convertedAmount}</Heading>
            <Text>{currency}</Text>
          </Flex>
        ) : (
          <Flex align="center" justify="center" gap={4}>
            <Icon size="small">
              <SatoshiV2Icon />
            </Icon>
            <Heading>{transferInfo.amount}</Heading>
            <Text>SAT</Text>
          </Flex>
        )}
        <Divider y={24} />
      </Container>

      <Flex>
        <Container size="small">
          <Divider y={16} />
          <Flex gap={8}>
            <LinkButton variant="borderless" href="/dashboard">
              {t("GO_HOME")}
            </LinkButton>
          </Flex>
          <Divider y={32} />
        </Container>
      </Flex>
    </>
  );
}
