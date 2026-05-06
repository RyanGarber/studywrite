import { type Material, useSetup } from "../stores/setup.tsx";
import { streamModel } from "./models.tsx";
import { Output } from "ai";
import { bufferToBase64 } from "../util.tsx";
import { useReview, Question } from "../stores/review.tsx";

export async function upload(files: File[]) {
  const { addMaterials } = useSetup.getState();
  addMaterials(
    await Promise.all(
      files.map(
        async (file) =>
          ({
            name: file.name,
            type: file.type,
            data: bufferToBase64(await file.arrayBuffer()),
          }) satisfies Material,
      ),
    ),
  );
}

export async function prepare() {
  const { materials, setPreparingMaterial } = useSetup.getState();
  const { removePreparedMaterial, addPreparedMaterial } = useReview.getState();
  try {
    for (const material of materials) {
      removePreparedMaterial(material.name);
      setPreparingMaterial(material.name);
      const system = `
You are a helpful AI study assistant. Your job is to help students remember information from their quizzes, notes, etc.

If the provided material is a set of questions already in quiz form, simply extract each one as-is.
Otherwise, extract every important fact from the material and come up with one question per fact.

If multiple-choice answers are already provided for a question, use them as-is.
Otherwise, include the correct answer(s) as-is and come up with incorrect choices that are plausible and consistent with them.

Provide a brief explanation for why each answer choice is correct or incorrect.
`;
      const stream = await streamModel({
        system,
        messages: [
          {
            role: "user",
            content: [
              {
                type: "file",
                filename: material.name,
                mediaType: material.type,
                data: material.data,
              },
            ],
          },
        ],
        output: Output.array({ element: Question }),
      });

      for await (const chunk of stream.elementStream) {
        console.log(chunk);
        addPreparedMaterial(material.name, [chunk]);
      }

      console.log("Output:", await stream.output);
    }
  } finally {
    setPreparingMaterial(null);
  }
}
