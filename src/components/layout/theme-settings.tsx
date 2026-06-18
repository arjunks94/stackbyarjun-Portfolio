"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Palette, X } from "lucide-react";
import { useEffect, useState } from "react";

const accentPresets = [
  { name: "Electric Blue", accent: "#3b82f6", secondary: "#8b5cf6" },
  { name: "Emerald", accent: "#10b981", secondary: "#06b6d4" },
  { name: "Rose", accent: "#f43f5e", secondary: "#ec4899" },
  { name: "Amber", accent: "#f59e0b", secondary: "#ef4444" },
  { name: "Violet", accent: "#8b5cf6", secondary: "#6366f1" },
];

export function ThemeSettingsPanel({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [spotlight, setSpotlight] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem("theme-settings");
    if (saved) {
      const settings = JSON.parse(saved);
      if (settings.accent) document.documentElement.style.setProperty("--accent", settings.accent);
      if (settings.secondary)
        document.documentElement.style.setProperty("--accent-secondary", settings.secondary);
      setReducedMotion(settings.reducedMotion ?? false);
      setSpotlight(settings.spotlight ?? true);
    }
  }, []);

  const saveSettings = (updates: Record<string, unknown>) => {
    const current = JSON.parse(localStorage.getItem("theme-settings") || "{}");
    const merged = { ...current, ...updates };
    localStorage.setItem("theme-settings", JSON.stringify(merged));
  };

  const applyAccent = (accent: string, secondary: string) => {
    document.documentElement.style.setProperty("--accent", accent);
    document.documentElement.style.setProperty("--accent-secondary", secondary);
    saveSettings({ accent, secondary });
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[140] bg-black/40"
            onClick={onClose}
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 z-[141] h-full w-full max-w-sm glass border-l border-border p-6"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Palette className="h-5 w-5 text-accent" />
                <h2 className="font-display text-lg font-semibold">Theme Settings</h2>
              </div>
              <button
                onClick={onClose}
                className="rounded-lg p-2 text-muted hover:bg-white/5 hover:text-foreground"
                aria-label="Close settings"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-8 space-y-6">
              <div>
                <h3 className="mb-3 text-sm font-medium text-muted">Accent Color</h3>
                <div className="grid grid-cols-5 gap-3">
                  {accentPresets.map((preset) => (
                    <button
                      key={preset.name}
                      onClick={() => applyAccent(preset.accent, preset.secondary)}
                      className="group flex flex-col items-center gap-1"
                      title={preset.name}
                    >
                      <div
                        className="h-8 w-8 rounded-full ring-2 ring-transparent transition-all group-hover:ring-accent/50"
                        style={{
                          background: `linear-gradient(135deg, ${preset.accent}, ${preset.secondary})`,
                        }}
                      />
                      <span className="text-[10px] text-muted">{preset.name.split(" ")[0]}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <label className="flex items-center justify-between">
                  <span className="text-sm text-muted">Mouse Spotlight</span>
                  <input
                    type="checkbox"
                    checked={spotlight}
                    onChange={(e) => {
                      setSpotlight(e.target.checked);
                      saveSettings({ spotlight: e.target.checked });
                      document.body.dataset.spotlight = String(e.target.checked);
                    }}
                    className="h-4 w-4 rounded accent-accent"
                  />
                </label>
                <label className="flex items-center justify-between">
                  <span className="text-sm text-muted">Reduce Motion</span>
                  <input
                    type="checkbox"
                    checked={reducedMotion}
                    onChange={(e) => {
                      setReducedMotion(e.target.checked);
                      saveSettings({ reducedMotion: e.target.checked });
                      document.documentElement.style.setProperty(
                        "scroll-behavior",
                        e.target.checked ? "auto" : "smooth",
                      );
                    }}
                    className="h-4 w-4 rounded accent-accent"
                  />
                </label>
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

export function ThemeSettingsTrigger({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 z-40 flex h-12 w-12 items-center justify-center rounded-full glass shadow-lift transition-transform hover:scale-105"
      aria-label="Open theme settings"
    >
      <Palette className="h-5 w-5 text-accent" />
    </button>
  );
}
