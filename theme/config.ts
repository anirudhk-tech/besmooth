import { config as base } from "@gluestack-ui/config";
import { createConfig } from "@gluestack-ui/themed";
import { GoogleGenAI } from "@google/genai";
import { colors } from "./colors";

export const gluestackConfig = createConfig({
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

const GEMINI_KEY = "AIzaSyBoec2rTzOH668_NcB8YnGmfj3TNWSQXmc";
export const GEMINI_MODEL = "gemini-2.0-flash";

export const gemini = new GoogleGenAI({ apiKey: GEMINI_KEY });
