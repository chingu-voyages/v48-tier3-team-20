"use client";
import React from "react";

function useFullscreen(init: boolean = false) {
  const [fullscreen, setFullscreen] = React.useState<boolean>(init);

  const enterFullscreen = React.useCallback(() => setFullscreen(true), []);
  const exitFullscreen = React.useCallback(() => setFullscreen(false), []);

  React.useEffect(() => {
    function handleEsc(e: KeyboardEvent) {
      if (e.code === "Escape") {
        exitFullscreen();
      }
    }
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [exitFullscreen]);

  React.useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as Element;
      const isPopup =
        target.classList.contains("confirmDelete") ||
        target.parentElement?.classList.contains("confirmDelete");

      if (fullscreen && !isPopup) {
        exitFullscreen();
      }
    };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [exitFullscreen, fullscreen]);

  return {
    fullscreen,
    enterFullscreen,
    exitFullscreen,
  };
}

export default useFullscreen;
