import { useEffect, useRef } from "react";

export function useDetectClickOutside(handler, listenCapturing = true) {
  const ref = useRef();

  useEffect(
    function () {
      function handleDetectClick(e) {
        // ref is the Window
        if (ref.current && !ref.current.contains(e.target)) {
          // console.log("Click Outsie");
          handler();
        }
      }

      document.addEventListener("click", handleDetectClick, listenCapturing);
      return () =>
        document.removeEventListener(
          "click",
          handleDetectClick,
          listenCapturing
        );
    },
    [handler, listenCapturing]
  );
  return ref;
}
