import { useCallback, useEffect, useState } from "react";

export const GetScroll = () => {
  const [scrollY, setScrollY] = useState(0);

  const onScroll = useCallback(() => {
    const yOffset = window.pageYOffset;
    setScrollY(yOffset);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [onScroll]);

  return scrollY;
};

