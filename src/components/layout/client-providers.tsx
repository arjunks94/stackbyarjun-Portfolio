"use client";

import { useState } from "react";
import { CommandPalette } from "./command-palette";
import { ThemeSettingsPanel, ThemeSettingsTrigger } from "./theme-settings";

export function ClientProviders({ children }: { children: React.ReactNode }) {
  const [settingsOpen, setSettingsOpen] = useState(false);

  return (
    <>
      {children}
      <CommandPalette onOpenSettings={() => setSettingsOpen(true)} />
      <ThemeSettingsTrigger onClick={() => setSettingsOpen(true)} />
      <ThemeSettingsPanel open={settingsOpen} onClose={() => setSettingsOpen(false)} />
    </>
  );
}
