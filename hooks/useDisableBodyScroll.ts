import { useEffect } from "react";

function useDisableBodyScroll() {
  useEffect(() => {
    document.body.classList.add("no-scroll");

    return () => {
      document.body.classList.remove("no-scroll");
    };
  });
}

export default useDisableBodyScroll;
