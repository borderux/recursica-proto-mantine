import { createContext, useContext } from "react";
import { useSearchParams } from "react-router";

/**
 * A named, numbered variant of a prototype: it selects which mock data
 * and/or which mock API behavior (success, error, empty, slow, a different
 * dataset entirely, ...) the prototype uses while rendering. A prototype
 * defines its own stories in a colocated `stories.ts` and decides what each
 * `id` actually does — this file only owns the URL convention and the
 * picker UI (`StoriesPanel.tsx`). See `docs/PROTOTYPE.md` for the full
 * process/rationale.
 */
export interface Story {
  /** Switched via `?story=<id>`. Must be a plain number. */
  id: number;
  /** Short label shown in the story picker. */
  name: string;
  /** What this story does differently (which data, which API behavior), for
   * the designer who asked for it. */
  description: string;
}

export interface UseStoriesResult {
  /** The story named by `?story=<id>`, or `stories[0]` if that param is
   * missing, non-numeric, or doesn't match any story's `id`. `undefined` if
   * the prototype has no stories at all. */
  activeStory: Story | undefined;
  /** Whether the story-picker panel should be open — see the `useStories`
   * doc comment for exactly which URLs open it. */
  isPanelOpen: boolean;
  /** Sets `?story=<id>`, closing the panel. */
  selectStory: (id: number) => void;
  /** Opens the picker panel without changing the active story. */
  openPanel: () => void;
  /** Closes the picker panel, keeping the active story as-is. */
  closePanel: () => void;
}

/**
 * Wires a prototype's `stories` array to the `?story=<id>` URL convention:
 *
 * - `?story=1` — selects that story directly.
 * - `?story` (no value) or `?stories` (any value, or none) — opens the
 *   picker panel instead of selecting a story.
 * - No `story` param, or one that isn't a recognized id — falls back to
 *   `stories[0]`.
 */
export function useStories(stories: Story[]): UseStoriesResult {
  const [searchParams, setSearchParams] = useSearchParams();
  const rawStory = searchParams.get("story");
  const isNumericStory = rawStory !== null && /^\d+$/.test(rawStory);
  const isPanelOpen =
    searchParams.has("stories") ||
    (searchParams.has("story") && !isNumericStory);

  const requestedId = isNumericStory ? Number(rawStory) : undefined;
  const activeStory =
    stories.find((story) => story.id === requestedId) ?? stories[0];

  function selectStory(id: number) {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.delete("stories");
      next.set("story", String(id));
      return next;
    });
  }

  function openPanel() {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.set("stories", "1");
      return next;
    });
  }

  function closePanel() {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.delete("stories");
      if (activeStory) {
        next.set("story", String(activeStory.id));
      } else {
        next.delete("story");
      }
      return next;
    });
  }

  return { activeStory, isPanelOpen, selectStory, openPanel, closePanel };
}

/**
 * Carries a `<Prototype>`'s `useStories` result down to its children, so a
 * prototype reads it with `usePrototypeStories()` instead of calling
 * `useStories` itself. See `Prototype.tsx`.
 */
export const StoriesContext = createContext<UseStoriesResult | null>(null);

/**
 * Reads the enclosing `<Prototype>`'s story state — e.g. `activeStory` for
 * a data/API switch, or `openPanel` for a button. Call from anywhere inside
 * a prototype wrapped in `<Prototype>` (`Prototype.tsx`).
 */
export function usePrototypeStories(): UseStoriesResult {
  const state = useContext(StoriesContext);
  if (!state) {
    throw new Error("usePrototypeStories must be used within a <Prototype>");
  }
  return state;
}
