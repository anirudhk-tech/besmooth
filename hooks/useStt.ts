import Voice from "@react-native-voice/voice";
import { useCallback, useEffect, useRef, useState } from "react";

type Options = { locale?: string; continuous?: boolean; autoStart?: boolean };

export function useStt({
  locale = "en-US",
  continuous = true,
  autoStart = true,
}: Options = {}) {
  const [listening, setListening] = useState(false);
  const [partial, setPartial] = useState("");
  const [lines, setLines] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [pauseTimer, setPauseTimer] = useState<number | null>(null);
  const startingRef = useRef(false);
  const stoppedRef = useRef(false);
  const listeningRef = useRef(false);
  const localeRef = useRef(locale);
  const continuousRef = useRef(continuous);

  const SILENCE_PAUSE = 3000; // 3 seconds of silence to stop listening

  useEffect(() => {
    listeningRef.current = listening;
  }, [listening]);
  useEffect(() => {
    localeRef.current = locale;
  }, [locale]);
  useEffect(() => {
    continuousRef.current = continuous;
  }, [continuous]);

  const start = useCallback(async () => {
    if (startingRef.current || listeningRef.current) return;
    startingRef.current = true;
    setError(null);
    setPartial("");
    try {
      if (typeof Voice?.start !== "function")
        throw new Error("Voice not linked");
      await Voice.start(localeRef.current);
      stoppedRef.current = false;
      console.log("Voice.start OK:", localeRef.current);
    } catch (e: any) {
      console.error("Voice.start failed:", e);
      setError(e?.message ?? "start failed");
      startingRef.current = false;
    }
  }, []);

  const stop = useCallback(async () => {
    stoppedRef.current = true;
    try {
      await Voice.stop();
    } catch (e) {
      console.warn("Voice.stop failed", e);
    }
    setListening(false);
  }, []);

  const reset = useCallback(() => {
    setLines([]);
    setPartial("");
    setError(null);
  }, []);

  useEffect(() => {
    Voice.onSpeechStart = () => {
      setListening(true);
      startingRef.current = false;
    };
    Voice.onSpeechEnd = () => {
      setListening(false);
      if (continuousRef.current && !stoppedRef.current)
        setTimeout(() => start(), 150);
    };
    Voice.onSpeechPartialResults = (e: { value?: string[] }) => {
      if (pauseTimer) clearTimeout(pauseTimer);
      setPauseTimer(setTimeout(() => stop(), SILENCE_PAUSE));
      setPartial(e.value?.[0] ?? "");
    };
    Voice.onSpeechResults = (e: { value?: string[] }) => {
      const text = (e.value?.[0] ?? "").trim();
      if (text) setLines((prev) => [...prev, text]);
      setPartial("");
    };
    Voice.onSpeechError = (e: any) => {
      setError(e?.error?.message ?? "STT error");
      setListening(false);
      startingRef.current = false;
      if (continuousRef.current && !stoppedRef.current)
        setTimeout(() => start(), 400);
    };

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, [start]);

  useEffect(() => {
    if (autoStart) start();
  }, [autoStart, start]);

  return { listening, partial, lines, error, start, stop, reset };
}
