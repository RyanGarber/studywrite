import { ActionIcon, Group, Modal, Select, Text } from "@mantine/core";
import { useModels } from "../stores/models.tsx";
import { fetchModels } from "../managers/models.tsx";
import { MdCached } from "react-icons/md";

interface SettingsProps {
  opened: boolean;
  onClose: () => void;
}

export default function Models({ opened, onClose }: SettingsProps) {
  const selectedModel = useModels((s) => s.selectedModel);
  const models = useModels((s) => s.models);

  return (
    <Modal opened={opened} onClose={onClose} withCloseButton={false} centered>
      <Group justify="space-between" mb="xs">
        <Text fw={500}>model</Text>
        <Group gap="xs">
          <Text c="dimmed">{models.length}</Text>
          <ActionIcon variant="transparent" onClick={() => void fetchModels()}>
            <MdCached />
          </ActionIcon>
        </Group>
      </Group>
      <Select
        data={models}
        allowDeselect={false}
        value={selectedModel}
        onChange={(model) => useModels.getState().setSelectedModel(model!)}
      />
    </Modal>
  );
}
