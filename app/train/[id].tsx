// app/train/[id].tsx
import { useConversation } from "@/hooks/useConversation";
import { colors } from "@/theme/colors";
import {
  Box,
  Center,
  HStack,
  Icon,
  ScrollView,
  Text,
  VStack,
} from "@gluestack-ui/themed";
import { Stack, useLocalSearchParams } from "expo-router";
import { User } from "lucide-react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const AVATAR_SIZE = 320;

type Meta = { name: string; tagline?: string };
const AVATAR_META: Record<string, Meta> = {
  "slot-1": { name: "Kushina", tagline: "playful but laser-focused" },
};

const MOCK_SPOKEN_WORDS: Record<string, string[]> = {
  "slot-1": [
    "hey",
    "there,",
    "ready",
    "to",
    "train?",
    "let’s",
    "work",
    "on",
    "flow",
    "and",
    "timing",
    "today.",
  ],
};

export default function TrainScreen() {
  useConversation();

  const params = useLocalSearchParams<{ id?: string }>();
  const id = params.id ?? "slot-1";

  const meta = AVATAR_META[id] ?? { name: "Mystery" };
  const words = MOCK_SPOKEN_WORDS[id] ?? [
    "mock",
    "line",
    "for",
    "now,",
    "avatar",
    "speaking...",
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      {/* Header / Back button via Stack.Screen */}
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: meta.name,
          headerTitleAlign: "center",
          headerStyle: { backgroundColor: colors.background },
          headerTintColor: "#ffffff",
          headerBackTitle: "Back",
        }}
      />

      <Box flex={1} bg="$appBg" px="$4" pt="$4">
        <VStack flex={1} space="xl">
          {/* Avatar Placeholder */}
          <Center flex={1}>
            <Box
              style={{ width: AVATAR_SIZE, height: AVATAR_SIZE }}
              bg="$surfaceElevated"
              borderWidth={1}
              borderColor="$border"
              rounded="$2xl"
              overflow="hidden"
            >
              <Center flex={1}>
                <VStack space="sm" alignItems="center">
                  <Icon as={User} size="xl" color="$textMuted" />
                  <Text color="$textMuted">Avatar Placeholder</Text>
                </VStack>
              </Center>
            </Box>
          </Center>

          {/* "Speaking" transcript chips (mock) */}
          <VStack space="md" mb="$6">
            <Text color="$textMuted" size="sm">
              Speaking…
            </Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: 8 }}
            >
              <HStack space="sm">
                {words.map((w, i) => (
                  <Box
                    key={`${w}-${i}`}
                    px="$3"
                    py="$2"
                    bg="$surface"
                    borderWidth={1}
                    borderColor="$border"
                    rounded="$xl"
                  >
                    <Text color="$text">{w}</Text>
                  </Box>
                ))}
              </HStack>
            </ScrollView>
          </VStack>
        </VStack>
      </Box>
    </SafeAreaView>
  );
}
