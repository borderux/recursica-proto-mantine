import { Button, Panel, Stack, Text } from "@recursica/adapter-mantine-v8";
import type { Story } from "./stories";

interface StoriesPanelProps {
  stories: Story[];
  activeStory: Story | undefined;
  isOpen: boolean;
  onSelect: (id: number) => void;
  onClose: () => void;
}

/**
 * The story picker: a panel that slides out from the right, listing every
 * story by name and description. Clicking one selects it and closes the
 * panel. Rendered by `<Prototype>` (`Prototype.tsx`) for every prototype,
 * so it opens via `?story`/`?stories` even when `stories` is empty.
 */
export function StoriesPanel({
  stories,
  activeStory,
  isOpen,
  onSelect,
  onClose,
}: StoriesPanelProps) {
  return (
    <Panel opened={isOpen} onClose={onClose} title="Stories" placement="right">
      <Panel.Body>
        {stories.length === 0 ? (
          <Text>This prototype doesn't define any stories.</Text>
        ) : (
          <Stack gap="md">
            {stories.map((story) => (
              <Stack key={story.id} gap={4}>
                <Button
                  variant={story.id === activeStory?.id ? "solid" : "outline"}
                  onClick={() => onSelect(story.id)}
                >
                  {story.name}
                </Button>
                <Text>{story.description}</Text>
              </Stack>
            ))}
          </Stack>
        )}
      </Panel.Body>
    </Panel>
  );
}
