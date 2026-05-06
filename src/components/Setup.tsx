import { Button, Container, Group, Stepper } from "@mantine/core";
import SetupUpload from "./SetupUpload.tsx";
import { useSetup } from "../stores/setup.tsx";
import SetupPrepare from "./SetupPrepare.tsx";
import { useModels } from "../stores/models.tsx";
import { useReview } from "../stores/review.tsx";
import SetupReview from "./SetupReview.tsx";

export default function Setup() {
  const currentStep = useSetup((s) => s.currentStep);
  const setCurrentStep = useSetup((s) => s.setCurrentStep);
  const preparingMaterial = useSetup((s) => s.preparingMaterial);
  const materials = useSetup((s) => s.materials);
  const selectedModel = useModels((m) => m.selectedModel);
  const preparedMaterials = useReview((r) => r.preparedMaterials);
  return (
    <>
      <Container h="100%">
        <Stepper active={currentStep} mt="10vh" contentPadding="xl">
          <Stepper.Step label="upload">
            <SetupUpload />
          </Stepper.Step>
          <Stepper.Step label="prepare" loading={!!preparingMaterial}>
            <SetupPrepare />
          </Stepper.Step>
          <Stepper.Step label="review">
            <SetupReview />
          </Stepper.Step>
        </Stepper>
        <Group justify="space-between" mt="xl">
          <Button
            variant="default"
            disabled={currentStep === 0}
            onClick={() => setCurrentStep(currentStep - 1)}
          >
            previous
          </Button>
          <Button
            disabled={
              !selectedModel ||
              (currentStep === 0 && !materials.length) ||
              (currentStep === 1 &&
                (!Object.values(preparedMaterials).length ||
                  !!preparingMaterial)) ||
              currentStep === 2
            }
            onClick={() => setCurrentStep(currentStep + 1)}
          >
            next
          </Button>
        </Group>
      </Container>
    </>
  );
}
