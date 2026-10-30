'use client';

import { Component, type ReactNode } from 'react';

// A failed auxiliary chunk must not replace the server-rendered page with an error.
export default class OptionalFeatureBoundary extends Component<
  { children: ReactNode; fallback?: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    return this.state.failed ? (this.props.fallback ?? null) : this.props.children;
  }
}
