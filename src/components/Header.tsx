import { ActionIcon, Container, Group, Indicator, Text } from "@mantine/core";
import { MdSettings } from "react-icons/md";
import Models from "./Models.tsx";
import { useState } from "react";
import { useModels } from "../stores/models.tsx";

export default function Header() {
  const selectedModel = useModels((s) => s.selectedModel);
  const [isSettingsOpen, setSettingsOpen] = useState(false);

  return (
    <Container h="100%">
      <Group justify="space-between" h="100%">
        <Text size="xl" variant="gradient" fw="bold">
          studywrite
        </Text>
        <Indicator offset={5} color="red" processing disabled={!!selectedModel}>
          <ActionIcon variant="transparent" size={36}>
            <MdSettings size={24} onClick={() => setSettingsOpen(true)} />
            <Models
              opened={isSettingsOpen}
              onClose={() => setSettingsOpen(false)}
            />
          </ActionIcon>
        </Indicator>
      </Group>
    </Container>
  );
}
