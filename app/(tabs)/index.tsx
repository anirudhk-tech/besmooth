import {
  Box,
  Button,
  ButtonText,
  Center,
  HStack,
  Icon,
  Pressable,
  ScrollView,
  Text,
  VStack,
} from "@gluestack-ui/themed";
import { useRouter } from "expo-router";
import { Lock, User } from "lucide-react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

type Thumb = { id: string; locked: boolean };

const THUMB_SIZE = 72;
const AVATAR_SIZE = 280;

const initialThumbs: Thumb[] = Array.from({ length: 12 }).map((_, i) => ({
  id: `slot-${i + 1}`,
  locked: i > 2,
}));

const AVATAR_META: Record<string, { name: string; tagline: string }> = {
  "slot-1": { name: "Kushina", tagline: "playful but laser-focused" },
};

export default function HomeScreen() {
  const [selectedId, setSelectedId] = useState<string>(initialThumbs[0].id);
  const meta = AVATAR_META[selectedId] ?? {
    name: "Mystery",
    tagline: "unknown but intriguing",
  };
  const router = useRouter();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#0B0D10" }}>
      <Box flex={1} bg="$appBg" px="$4" pt="$2" style={{ paddingBottom: 100 }}>
        <VStack space="lg" flex={1}>
          {/* Top: scrollable selection squares */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <HStack space="md" py="$2">
              {initialThumbs.map((t) => {
                const isSelected = t.id === selectedId;
                return (
                  <Pressable
                    key={t.id}
                    onPress={() => !t.locked && setSelectedId(t.id)}
                    disabled={t.locked}
                  >
                    <Box
                      style={{ width: THUMB_SIZE, height: THUMB_SIZE }}
                      bg="$surface"
                      borderWidth={1}
                      borderColor={isSelected ? "$brand" : "$border"}
                      opacity={t.locked ? 0.5 : 1}
                      rounded="$md"
                      overflow="hidden"
                    >
                      <Center flex={1}>
                        <Icon
                          as={t.locked ? Lock : User}
                          size="lg"
                          color="$textMuted"
                        />
                      </Center>
                    </Box>
                  </Pressable>
                );
              })}
            </HStack>
          </ScrollView>

          {/* Avatar + floating name badge */}
          <Center flex={8}>
            <Box position="relative" style={{ width: AVATAR_SIZE }}>
              {/* Floating badge */}
              <Box
                position="absolute"
                top={-64}
                left={0}
                right={0}
                alignItems="center"
                style={{ zIndex: 2 }}
              >
                <VStack alignItems="center" space="xs">
                  <Box
                    px="$4"
                    py="$2"
                    bg="$surfaceElevated"
                    borderWidth={1}
                    borderColor="$brand"
                    rounded="$full"
                  >
                    <Text
                      color="$text"
                      size="2xl"
                      fontWeight="$bold"
                      style={{ letterSpacing: 0.5 }}
                    >
                      {meta.name}
                    </Text>
                  </Box>
                  <Text
                    mt="$1"
                    color="$textMuted"
                    size="sm"
                    textAlign="center"
                    style={{ fontStyle: "italic" }}
                  >
                    {meta.tagline}
                  </Text>
                </VStack>
              </Box>

              {/* Avatar placeholder */}
              <Box
                style={{ width: AVATAR_SIZE, height: AVATAR_SIZE, zIndex: 1 }}
                bg="$surfaceElevated"
                borderWidth={1}
                borderColor="$border"
                rounded="$2xl"
                overflow="hidden"
                mt="$8"
              >
                <Center flex={1}>
                  <VStack space="sm" alignItems="center">
                    <Icon as={User} size="xl" color="$textMuted" />
                    <Text color="$textMuted">Avatar Placeholder</Text>
                  </VStack>
                </Center>
              </Box>
            </Box>
          </Center>

          {/* Train */}
          <Center>
            <Button
              size="lg"
              bg="$brand"
              rounded="$xl"
              $active-bg="$brandStrong"
              $pressed-bg="$brandStrong"
              width="100%"
              onPress={() =>
                router.push({
                  pathname: "/train/[id]",
                  params: { id: selectedId },
                })
              }
            >
              <ButtonText color="$background">Train</ButtonText>
            </Button>
          </Center>
        </VStack>
      </Box>
    </SafeAreaView>
  );
}
