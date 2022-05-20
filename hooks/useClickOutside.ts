import { useRef, useEffect } from "react";

function useClickOutside<T extends HTMLElement = HTMLDivElement>(
  onClickOutside: (e: MouseEvent) => void
) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (
        ref.current != null &&
        e.target instanceof HTMLElement &&
        !ref.current.contains(e.target)
      ) {
        onClickOutside(e);
      }
    }
    document.addEventListener("click", handleClick);

    return () => document.removeEventListener("click", handleClick);
  }, [onClickOutside]);

  return ref;
}

export default useClickOutside;
