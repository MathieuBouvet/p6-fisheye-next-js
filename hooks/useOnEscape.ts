import { useEffect } from "react";

function useOnEscape(onEscape: () => void) {
  useEffect(() => {
    function handler(e: KeyboardEvent) {
      if (e.code === "Escape") {
        onEscape();
      }
    }
    document.addEventListener("keydown", handler);

    return () => document.removeEventListener("keydown", handler);
  }, [onEscape]);
}

export default useOnEscape;
