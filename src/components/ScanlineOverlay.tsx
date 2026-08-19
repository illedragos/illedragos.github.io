import React from "react";
import { useHackerMode } from "../context/HackerModeContext";

/** CRT scanlines, flicker and vignette — only while hacker mode is engaged. */
const ScanlineOverlay: React.FC = () => {
  const { isHackerMode } = useHackerMode();
  if (!isHackerMode) return null;

  return (
    <>
      <div className="crt-scanlines" aria-hidden="true" />
      <div className="crt-vignette" aria-hidden="true" />
      <div className="crt-sweep" aria-hidden="true" />
    </>
  );
};

export default ScanlineOverlay;
