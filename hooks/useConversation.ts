import { CHARACTERS } from "@/constants/characters";
import { useEffect } from "react";
import { useGeminiChat } from "./useGeminiChat";
import { useStt } from "./useStt";

export const useConversation = () => {
  const { listening, partial } = useStt({ autoStart: true, continuous: false });
  const { sendMessage } = useGeminiChat({ c: CHARACTERS[0] });

  useEffect(() => {
    if (!listening && partial.trim()) {
      sendMessage(partial.trim());
    }
  }, [listening]);
};
