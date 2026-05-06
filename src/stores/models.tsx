import { create } from "zustand/react";
import { persist } from "zustand/middleware";

interface Models {
  models: string[];
  setModels: (models: string[]) => void;
  selectedModel: string;
  setSelectedModel: (model: string) => void;
}

export const useModels = create(
  persist<Models>(
    (set) => ({
      models: [],
      setModels: (models: string[]) => set({ models }),
      selectedModel: "",
      setSelectedModel: (model: string) => set({ selectedModel: model }),
    }),
    { name: "models" },
  ),
);
