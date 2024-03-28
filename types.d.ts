import type { StoryFn } from "@storybook/web-components";
type OmitAttributes = "style";
type Override<ComponentClass, StoryArgs> = {
    [ComponentKey in Exclude<keyof ComponentClass, keyof StoryArgs | OmitAttributes>]?: ComponentClass[ComponentKey];
} & {
    [ComponentKey in keyof StoryArgs]: StoryArgs[ComponentKey];
} & {
    style?: string;
};
export type UI5StoryArgs<ComponentClass, StoryArgs> = StoryFn<Override<ComponentClass, StoryArgs>>;
export {};
