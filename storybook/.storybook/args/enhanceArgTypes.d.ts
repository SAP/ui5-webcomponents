import type { Renderer, StoryContextForEnhancers } from "@storybook/types";
export declare const enhanceArgTypes: <TRenderer extends Renderer>(context: StoryContextForEnhancers<TRenderer, import("@storybook/types").Args>) => import("@storybook/types").StrictArgTypes<import("@storybook/types").Args>;
