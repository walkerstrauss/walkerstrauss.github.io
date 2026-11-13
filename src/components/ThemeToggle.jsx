import React, { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react"; // Optional: install with `npm i lucide-react`

function readTheme() {
  // The inline script in index.html has already applied this before first paint.
  if (typeof document !== "undefined") {
    const applied = document.documentElement.getAttribute("data-theme");
    if (applied) return applied;
  }
  try {
    return localStorage.getItem("theme") || "dark";
  } catch {
    return "dark";
  }
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState(readTheme);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    try {
      localStorage.setItem("theme", theme);
    } catch {
      /* private mode: the toggle still works for this session */
    }
  }, [theme]);

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  return (
    <button
      onClick={toggleTheme}
      className="theme-toggle"
      aria-label="Toggle light/dark mode"
    >
      {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}