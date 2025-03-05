"use client";

import { Switch } from "@/components/ui/switch";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const [mounted, setmounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setmounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div>
      <Switch
        checked={theme === "light"}
        className='h-10 w-20 pl-1 data-[state=checked]:bg-primary-80'
        onCheckedChange={() => setTheme(theme === "light" ? "dark" : "light")}
        aria-label='Toggle dark mode'
      />
    </div>
  );
}
