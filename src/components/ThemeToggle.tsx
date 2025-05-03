
import React, { useEffect, useState } from 'react';
import ThemeSwitch from "@/components/ui/theme-switch";

const ThemeToggle = () => {
  const [mounted, setMounted] = useState(false);

  // Ensure theme toggle only renders client-side
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="flex items-center justify-center scale-90">
      <ThemeSwitch />
    </div>
  );
};

export default ThemeToggle;
