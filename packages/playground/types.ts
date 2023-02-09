import type { StoryFn } from "@storybook/web-components";

type OmitAttributes = "style";

type Override<ComponentClass, StoryArgs> = {
  // remove all keys from ComponentClass that are present in StoryArgs and OmitAttributes
  [ComponentKey in Exclude<
    keyof ComponentClass,
    keyof StoryArgs | OmitAttributes
  >]?: ComponentClass[ComponentKey];
} & {
  // add all keys from StoryArgs to ComponentClass
  [ComponentKey in keyof StoryArgs]: StoryArgs[ComponentKey];
} & {
  // make style properties optional
  style?: string;
};

export type UI5StoryArgs<ComponentClass, StoryArgs> = StoryFn<
  Override<ComponentClass, StoryArgs>
>;
