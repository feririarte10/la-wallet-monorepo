import React from 'react';
import type { ReactNode } from 'react';

import { TabListStyle } from './style.js';

interface TabListProps {
  children: ReactNode;
}

export function TabList(props: TabListProps) {
  const { children } = props;

  return <TabListStyle>{children}</TabListStyle>;
}
