import React from 'react';
import type { ReactNode } from 'react';

import { TabPanelsStyle } from './style.js';

interface TabPanelsProps {
  children: ReactNode;
}

export function TabPanels(props: TabPanelsProps) {
  const { children } = props;

  return <TabPanelsStyle>{children}</TabPanelsStyle>;
}
