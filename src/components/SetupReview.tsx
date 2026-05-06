import { Timeline } from "@mantine/core";
import { useReview } from "../stores/review.tsx";

export default function SetupReview() {
  const preparedMaterials = useReview((s) => s.preparedMaterials);
  const questions = Object.values(preparedMaterials).flat();
  return <></>;
}
