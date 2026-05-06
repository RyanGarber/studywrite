import { useModels } from "../stores/models.tsx";
import { createOpenAICompatible } from "@ai-sdk/openai-compatible";
import { type LanguageModel, streamText } from "ai";

export async function fetchModels() {
  const models: string[] = [];

  if (import.meta.env.VITE_OPENAI_CUSTOM_URL) {
    const result = await (
      await fetch(import.meta.env.VITE_OPENAI_CUSTOM_URL + "models")
    ).json();
    for (const model of result.data) {
      if (model.id.includes("embed")) continue;
      models.push(`custom/${model.id}`);
    }
  }

  useModels.getState().setModels(models);
}

export async function streamModel(
  settings: Partial<Parameters<typeof streamText>[0]>,
) {
  const selectedModel = useModels.getState().selectedModel;
  let model: LanguageModel | null = null;

  if (selectedModel.startsWith("custom/")) {
    const custom = createOpenAICompatible({
      name: "custom",
      baseURL: import.meta.env.VITE_OPENAI_CUSTOM_URL,
      supportsStructuredOutputs: true,
    });
    model = custom(selectedModel.slice(7));
  }

  if (!model) throw new Error(`Model not found: ${selectedModel}`);
  return streamText({
    ...(settings as Parameters<typeof streamText>[0]),
    model,
  });
}
