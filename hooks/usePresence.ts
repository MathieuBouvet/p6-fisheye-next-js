import { useState, useCallback } from "react";

type Presence = "PRESENT" | "ABSENT" | "VANISHING";

function usePresence(initialPresence: Presence = "ABSENT") {
  const [presence, setPresence] = useState<Presence>(initialPresence);

  const isVisible = presence === "PRESENT" || presence === "VANISHING";
  const isVanishing = presence === "VANISHING";

  const setPresent = useCallback(() => setPresence("PRESENT"), []);
  const setAbsent = useCallback(() => setPresence("ABSENT"), []);
  const setVanishing = useCallback(() => setPresence("VANISHING"), []);

  return { isVisible, isVanishing, setPresent, setAbsent, setVanishing };
}

export default usePresence;
