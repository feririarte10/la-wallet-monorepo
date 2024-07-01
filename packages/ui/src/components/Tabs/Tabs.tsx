import React from 'react';
import type { ReactNode } from 'react';

import { TabsStyle } from './style.js';

interface TabsProps {
  children: ReactNode;
}

export function Tabs(props: TabsProps) {
  const { children } = props;

  return <TabsStyle>{children}</TabsStyle>;
}
