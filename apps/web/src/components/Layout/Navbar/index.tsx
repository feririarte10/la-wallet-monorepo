'use client';

import { CaretLeftIcon } from '@bitcoin-design/bitcoin-icons-react/filled';
import { Button, Container, Flex, Icon, Text } from '@lawallet/ui';
import { useTranslations } from 'next-intl';
import { ReactNode } from 'react';

import { appTheme } from '@/config/exports';
import { useRouter } from '@/navigation';

// Constans
import { EMERGENCY_LOCK_DEPOSIT, EMERGENCY_LOCK_TRANSFER } from '@/utils/constants';

import { AlertSystemStyle, Left, Navbar, Right } from './style';

interface ComponentProps {
  children?: ReactNode;
  title?: string;
  showBackPage?: boolean;
  overrideBack?: string;
}

export default function Component(props: ComponentProps) {
  const { children, showBackPage = false, title, overrideBack = '' } = props;

  const router = useRouter();
  const t = useTranslations();

  const onlyChildren = !children;

  return (
    <Flex direction="column">
      {(EMERGENCY_LOCK_DEPOSIT || EMERGENCY_LOCK_TRANSFER) && (
        <AlertSystemStyle $background={appTheme.colors.error15}>
          <Container>
            <Flex flex={1} justify="center" align="center">
              <Text color={appTheme.colors.error}>
                {t('PAUSED')}: {EMERGENCY_LOCK_DEPOSIT && t('DEPOSITS')}{' '}
                {EMERGENCY_LOCK_DEPOSIT && EMERGENCY_LOCK_TRANSFER && t('AND')}{' '}
                {EMERGENCY_LOCK_TRANSFER && t('TRANSFERS')}
              </Text>
            </Flex>
          </Container>
        </AlertSystemStyle>
      )}
      <Navbar>
        <Container>
          <Flex flex={1} align="center" gap={8}>
            {onlyChildren && (
              <Left>
                {showBackPage && (
                  <Button
                    size="small"
                    variant="bezeledGray"
                    onClick={() => {
                      overrideBack ? router.push(overrideBack) : router.back();
                    }}
                  >
                    <Icon size="small">
                      <CaretLeftIcon />
                    </Icon>
                    {/* {t('BACK')} */}
                  </Button>
                )}
              </Left>
            )}
            {title ? (
              <Flex justify="center">
                <Text isBold>{title}</Text>
              </Flex>
            ) : (
              children
            )}
            {onlyChildren && <Right></Right>}
          </Flex>
        </Container>
      </Navbar>
    </Flex>
  );
}
