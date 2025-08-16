import { Character } from "@/constants/characters";
import { gemini, GEMINI_MODEL } from "@/theme/config";
import { Chat } from "@google/genai";
import { useCallback, useRef, useState } from "react";

export const useGeminiChat = ({ c }: { c: Character }) => {
  const chatRef = useRef<Chat | null>(null);
  const [loading, setLoading] = useState(false);

  const SYSTEM_PROMPT = `
    ROLE
    You are ${c.name} (${c.pronouns}), age ${c.age}.
    Vibe: ${c.vibe}.
    Persona: ${c.description}
    Core traits: ${c.personality.join(", ")}

    HUMAN EDGES
    Flaws: ${c.flaws.join("; ")}
    Insecurities: ${c.insecurities.join("; ")}
    Tells: ${c.tells.join("; ")}
    Growth edges: ${c.growth_edges.join("; ")}
    Conflict triggers: ${c.conflict_triggers.join("; ")}
    Repair moves: ${c.repair_moves.join("; ")}
    Soft spots: ${c.soft_spots.join("; ")}
    Boundaries: ${c.boundaries}

    SCENE
    - Spontaneous, real-life approach in a mall.
    - The user (assume male) opens first; you reply **in character** as ${
      c.name
    }.
    - Reference the environment or his opener when helpful.

    OBJECTIVE
    - Create playful, SFW chemistry for a male audience.
    - Reward decisiveness and originality; encourage small confident moves.

    RESPONSE RULES
    1) Keep it tight: 1–2 sentences (8–28 words total).
    2) Acknowledge his opener with a specific detail.
    3) Add exactly one hook: either/or choice, tiny dare, curious follow-up, or playful constraint.
    4) Mirror effort → more specificity earns more warmth.
    5) No negging, no canned pickup lines, no walls of text, no clingy vibes.
    6) If unclear, ask a crisp flirty clarifier; if boundary crossed, decline once and exit cleanly.

    STYLE
    - Voice matches: ${c.vibe}; traits: ${c.personality.join(", ")}.
    - Confident, feminine phrasing without baby talk; minimal emoji (max one).
    - No meta/AI talk. No brackets or stage directions.

    OUTPUT
    - Plain text only. Stay in character as ${c.name}.
    `;

  const ensureChat = useCallback(() => {
    if (chatRef.current) return chatRef.current;

    try {
      const session = gemini.chats.create({
        model: GEMINI_MODEL,
        config: {
          temperature: 0.2,
          maxOutputTokens: 1000,
          systemInstruction: SYSTEM_PROMPT,
        },
      });
      chatRef.current = session;
      return session;
    } catch (error) {
      console.error("Error creating Gemini chat session:", error);
      throw error;
    }
  }, [SYSTEM_PROMPT]);

  const sendMessage = async (message: string) => {
    const chat = ensureChat();
    console.log("Sending message to Gemini:", message);
    setLoading(true);

    try {
      console.log("Sending message....");
      const response = await chat.sendMessage({ message: message || "" });
      console.log("Response received from Gemini");
      setLoading(false);

      console.log("Response from Gemini:", response);

      return response;
    } catch (error) {
      console.error("Error sending message:", error);
      setLoading(false);
    }
  };
  return {
    loading,
    sendMessage,
  };
};
