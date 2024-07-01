import React from 'react';
import type { ReactNode } from 'react';
import { Flex } from '../Flex/index.js';

import { TabPanelStyle } from './style.js';

interface TabPanelProps {
  children: ReactNode;
  show?: boolean;
}

export function TabPanel(props: TabPanelProps) {
  const { children, show = false } = props;

  return (
    <TabPanelStyle $show={show}>
      <Flex direction="column" flex={1}>
        {children}
      </Flex>
    </TabPanelStyle>
  );
}
