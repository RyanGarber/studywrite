import { create } from "zustand/react";
import { persist } from "zustand/middleware";
import { z } from "zod";

export const Question = z.object({
  question_text: z.string(),
  answer_choices: z.array(
    z.object({
      answer_text: z.string(),
      is_correct: z.boolean(),
      explanation: z.string(),
    }),
  ),
});
export type Question = z.infer<typeof Question>;

interface Review {
  preparedMaterials: Record<string, Question[]>;
  addPreparedMaterial: (material: string, questions: Question[]) => void;
  removePreparedMaterial: (material: string) => void;
}

export const useReview = create(
  persist<Review>(
    (set, get) => ({
      preparedMaterials: {},
      addPreparedMaterial: (material: string, questions: Question[]) => {
        if (!get().preparedMaterials[material]) {
          get().preparedMaterials[material] = [];
        }
        get().preparedMaterials[material].push(...questions);
        set({ preparedMaterials: { ...get().preparedMaterials } });
      },
      removePreparedMaterial: (material: string) => {
        delete get().preparedMaterials[material];
        set({ preparedMaterials: { ...get().preparedMaterials } });
      },
    }),
    { name: "review" },
  ),
);
