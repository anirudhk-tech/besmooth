import { config as base } from "@gluestack-ui/config";
import { createConfig } from "@gluestack-ui/themed";
import { colors } from "./colors";

const gluestackConfig = createConfig({
  ...base,
  tokens: {
    ...base.tokens,
    colors: {
      ...base.tokens.colors,
      appBg: colors.background,
      surface: colors.surface,
      surfaceElevated: colors.surfaceElevated,
      brand: colors.brand,
      brandStrong: colors.brandStrong,
      text: colors.text,
      textMuted: colors.textMuted,
      border: colors.border,
      success: colors.success,
      danger: colors.danger,
    },
  },
});

export default gluestackConfig;
