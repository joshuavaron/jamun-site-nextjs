"use client";

/**
 * BGWriterContext - Position Paper Writer Context & Provider
 *
 * Slim wrapper: creates the React Context and provides the BGWriterProvider.
 * All state management logic lives in useBGWriterState.ts.
 * All TypeScript types live in bgWriterTypes.ts.
 */

import { createContext, useContext } from "react";
import type { BGWriterContextValue, BGWriterProviderProps } from "./bgWriterTypes";
import { useBGWriterState } from "./useBGWriterState";

const BGWriterContext = createContext<BGWriterContextValue | null>(null);

export function useBGWriter() {
  const context = useContext(BGWriterContext);
  if (!context) {
    throw new Error("useBGWriter must be used within BGWriterProvider");
  }
  return context;
}

export function BGWriterProvider({ children }: BGWriterProviderProps) {
  const value = useBGWriterState();

  return (
    <BGWriterContext.Provider value={value}>
      {children}
    </BGWriterContext.Provider>
  );
}
