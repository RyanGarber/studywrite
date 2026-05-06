import { Card, CloseButton, Group, Stack, Text } from "@mantine/core";
import { MdCancel, MdUpload, MdUploadFile } from "react-icons/md";
import { Dropzone } from "@mantine/dropzone";
import { useSetup } from "../stores/setup.tsx";
import { upload } from "../managers/setup.tsx";

export default function SetupUpload() {
  const notes = useSetup((r) => r.materials);
  const removeMaterial = useSetup((r) => r.removeMaterial);

  return (
    <Stack>
      <Dropzone onDrop={(files) => upload(files)}>
        <Group p="lg" h={150} style={{ pointerEvents: "none" }}>
          <Dropzone.Accept>
            <MdUploadFile size={32} color="var(--mantine-color-blue-6)" />
          </Dropzone.Accept>
          <Dropzone.Reject>
            <MdCancel size={32} color="var(--mantine-color-red-6)" />
          </Dropzone.Reject>
          <Dropzone.Idle>
            <MdUpload size={32} color="var(--mantine-color-dimmed)" />
          </Dropzone.Idle>
          <Text size="lg" c="dimmed">
            upload or drop notes here
          </Text>
        </Group>
      </Dropzone>
      <Group>
        {notes.map((note) => (
          <Card key={note.name} withBorder padding="lg" w={250}>
            <Stack gap="xs">
              <Group justify="space-between">
                <Text
                  style={{
                    textOverflow: "ellipsis",
                    textWrap: "nowrap",
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    flex: 1,
                  }}
                >
                  {note.name}
                </Text>
                <CloseButton
                  variant="transparent"
                  onClick={() => removeMaterial(note.name)}
                ></CloseButton>
              </Group>
            </Stack>
          </Card>
        ))}
      </Group>
    </Stack>
  );
}
