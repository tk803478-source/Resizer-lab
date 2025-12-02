import { create } from "zustand";

interface PresetStore {
  selectedPreset: number | null;
  setSelectedPreset: (preset: number | null) => void;
  clearPreset: () => void;
}

export const usePresetStore = create<PresetStore>((set) => ({
  selectedPreset: null,
  setSelectedPreset: (preset) => set({ selectedPreset: preset }),
  clearPreset: () => set({ selectedPreset: null }),
}));
