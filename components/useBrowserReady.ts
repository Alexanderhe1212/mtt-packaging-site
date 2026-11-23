'use client';
import { useSyncExternalStore } from 'react';

const subscribe = () => () => {};
const browser = () => true;
const server = () => false;

// Keep the first hydration render identical to the static HTML.
export function useBrowserReady() {
  return useSyncExternalStore(subscribe, browser, server);
}
