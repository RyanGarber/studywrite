import { create } from "zustand/react";
import { persist } from "zustand/middleware";

export interface Material {
  name: string;
  type: string;
  data: string;
}

interface Setup {
  materials: Material[];
  addMaterials: (materials: Material[]) => void;
  removeMaterial: (name: string) => void;

  currentStep: number;
  setCurrentStep: (step: number) => void;

  preparingMaterial: string | null;
  setPreparingMaterial: (isPreparing: string | null) => void;
}

export const useSetup = create(
  persist<Setup>(
    (set) => ({
      materials: [],
      addMaterials: (materials) => set({ materials }),
      removeMaterial: (name) =>
        set((state) => ({
          materials: state.materials.filter((note) => note.name !== name),
        })),

      currentStep: 0,
      setCurrentStep: (step) => set({ currentStep: step }),

      preparingMaterial: null,
      setPreparingMaterial: (preparingMaterial) => set({ preparingMaterial }),
    }),
    {
      name: "setup",
    },
  ),
);
