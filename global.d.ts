import * as React from 'react';

declare global {
  const React: typeof React;
  const useState: typeof React.useState;
  const useEffect: typeof React.useEffect;
  const useRef: typeof React.useRef;
  const useMemo: typeof React.useMemo;
  const useCallback: typeof React.useCallback;
}
