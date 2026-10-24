import * as XLSXModule from 'xlsx-js-style';

// Bulletproof resolver for XLSX in different bundlers and runtimes
const getXLSX = (): any => {
  // 1. Check if the default export holds the actual SheetJS library object
  if (XLSXModule && (XLSXModule as any).default && (XLSXModule as any).default.utils) {
    return (XLSXModule as any).default;
  }
  // 2. Check if the module namespace itself has the library methods (direct named exports)
  if (XLSXModule && XLSXModule.utils) {
    return XLSXModule;
  }
  // 3. Browser global fallback
  if (typeof window !== "undefined" && (window as any).XLSX) {
    return (window as any).XLSX;
  }
  // 4. Final module namespace fallback
  return XLSXModule;
};

export const XLSX = getXLSX();
