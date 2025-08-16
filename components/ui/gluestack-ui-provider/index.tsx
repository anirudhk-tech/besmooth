import { gluestackConfig } from "@/theme/config";
import { GluestackUIProvider as BaseProvider } from "@gluestack-ui/themed";
import React, { PropsWithChildren } from "react";

export function GluestackUIProvider({ children }: PropsWithChildren) {
  // sanity check in runtime
  if (!gluestackConfig || !gluestackConfig.tokens) {
    console.error("gluestackConfig is undefined or missing tokens");
  }

  return (
    <BaseProvider config={gluestackConfig} colorMode="dark">
      {children}
    </BaseProvider>
  );
}

export default GluestackUIProvider;
