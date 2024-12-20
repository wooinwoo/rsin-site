import { RefObject, useEffect } from "react";

export function useClickAway(refs: RefObject<HTMLElement>[], handler: () => void) {
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const isOutside = refs.every(
        (ref) => ref.current && !ref.current.contains(event.target as Node)
      );

      if (isOutside) {
        handler();
      }
    };

    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [refs, handler]);
}
