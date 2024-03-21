'use client';

import { useState } from 'react';

export enum ViewStatus {
  loading = 'loading',
  success = 'success',
  error = 'error',
}

export function useViewStatus() {
  const [viewStatus, setViewStatus] = useState<ViewStatus>(ViewStatus.loading);

  const viewProps = {
    'data-status': viewStatus,
  };

  return { viewProps, setViewStatus };
}
