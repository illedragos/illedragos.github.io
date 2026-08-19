import React, { createContext, useContext, useEffect, useState } from "react";

interface HackerModeContextType {
  isHackerMode: boolean;
  toggleHackerMode: () => void;
}

const HackerModeContext = createContext<HackerModeContextType | undefined>(
  undefined
);

export const HackerModeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isHackerMode, setIsHackerMode] = useState(() => {
    const saved = localStorage.getItem("hackerMode");
    return saved === "true";
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isHackerMode) {
      // Hacker mode is a dark-only experience: force the dark palette on too.
      root.classList.add("hacker", "dark");
    } else {
      root.classList.remove("hacker");
      // Hand control of `dark` back to DarkModeContext by replaying its value.
      if (localStorage.getItem("darkMode") === "false") {
        root.classList.remove("dark");
      }
    }
    localStorage.setItem("hackerMode", isHackerMode.toString());
  }, [isHackerMode]);

  const toggleHackerMode = () => setIsHackerMode((prev) => !prev);

  return (
    <HackerModeContext.Provider value={{ isHackerMode, toggleHackerMode }}>
      {children}
    </HackerModeContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useHackerMode = () => {
  const context = useContext(HackerModeContext);
  if (context === undefined) {
    throw new Error("useHackerMode must be used within a HackerModeProvider");
  }
  return context;
};
