import sc from "@ungap/structured-clone";
if (!globalThis.structuredClone)
  (globalThis as any).structuredClone = sc as any;
