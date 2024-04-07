"use client";
import React from "react";

function useFullscreen(init: boolean = false) {
  const [fullscreen, setFullscreen] = React.useState<boolean>(init);

  const enterFullscreen = React.useCallback(() => setFullscreen(true), []);
  const exitFullscreen = React.useCallback(() => setFullscreen(false), []);

  const popupBoxClass = "popup-box";

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

      // hack using classname, consider using useRef
      const isPopup =
        target.classList.contains(popupBoxClass) ||
        target.parentElement?.classList.contains(popupBoxClass);

      if (fullscreen && !isPopup) {
        exitFullscreen();
      }
    };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [exitFullscreen, fullscreen]);

  return {
    fullscreen,
    popupBoxClass,
    enterFullscreen,
    exitFullscreen,
  };
}

export default useFullscreen;
