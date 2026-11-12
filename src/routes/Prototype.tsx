import type { ReactNode } from "react";
import { StoriesContext, useStories, type Story } from "./stories";
import { StoriesPanel } from "./StoriesPanel";

interface PrototypeProps {
  /** This prototype's stories, from its colocated `stories.ts`. Omit it (or
   * pass nothing) if the prototype doesn't define any stories — the picker
   * panel still opens via `?story`/`?stories`, it just has nothing to
   * list. */
  stories?: Story[];
  children: ReactNode;
}

/**
 * Shared chrome every prototype's `index.tsx` renders through, instead of
 * calling `useStories`/`StoriesPanel` itself. Owns the `?story=<id>` /
 * `?story` / `?stories` URL convention and always mounts the picker panel
 * — so opening it works for every prototype, even one that hasn't defined
 * any stories yet. Read the story state from inside `children` with
 * `usePrototypeStories` (`stories.ts`). See `docs/PROTOTYPE.md`.
 */
export function Prototype({ stories = [], children }: PrototypeProps) {
  const state = useStories(stories);

  return (
    <StoriesContext.Provider value={state}>
      {children}
      <StoriesPanel
        stories={stories}
        activeStory={state.activeStory}
        isOpen={state.isPanelOpen}
        onSelect={state.selectStory}
        onClose={state.closePanel}
      />
    </StoriesContext.Provider>
  );
}
