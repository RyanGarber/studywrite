import {
  Accordion,
  Button,
  Card,
  Group,
  Loader,
  Stack,
  Text,
} from "@mantine/core";
import { useReview } from "../stores/review.tsx";
import { prepare } from "../managers/setup.tsx";
import { useSetup } from "../stores/setup.tsx";
import { MdDone } from "react-icons/md";

export default function SetupPrepare() {
  const preparedMaterials = useReview((s) => s.preparedMaterials);
  const materials = useSetup((s) => s.materials);
  const preparingMaterial = useSetup((s) => s.preparingMaterial);

  return (
    <>
      <Card withBorder padding="xl">
        <Group justify="space-between">
          <Text fw={500} size="lg">
            {Object.values(preparedMaterials).flat().length} questions prepared
          </Text>
          <Button disabled={!!preparingMaterial} onClick={() => void prepare()}>
            prepare
          </Button>
        </Group>
      </Card>
      <Accordion mt="md" variant="separated">
        {materials.map((material) => (
          <Accordion.Item
            value={String(materials.indexOf(material))}
            key={materials.indexOf(material)}
          >
            <Accordion.Control>
              <Group justify="space-between" mr="xs">
                <Group gap="xs">
                  {preparingMaterial === material.name ? (
                    <Loader size="xs" />
                  ) : (
                    preparedMaterials[material.name]?.length && (
                      <MdDone color="green" size={25} />
                    )
                  )}
                  {material.name}
                </Group>
                <Text c="dimmed" size="sm">
                  {preparedMaterials[material.name]?.length || 0}
                </Text>
              </Group>
            </Accordion.Control>
            <Accordion.Panel>
              <Stack gap="xs">
                {preparedMaterials[material.name]?.map((question, i) => (
                  <Card key={i} p="xs" bg="gray.0">
                    <Text
                      style={{
                        textOverflow: "ellipsis",
                        textWrap: "nowrap",
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {question.question_text}
                    </Text>
                  </Card>
                )) || <Text c="dimmed">empty</Text>}
              </Stack>
            </Accordion.Panel>
          </Accordion.Item>
        ))}
      </Accordion>
    </>
  );
}
