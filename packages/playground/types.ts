import type { Story } from "@storybook/web-components";

type OmitAttributes = "style";

type Override<T, S> = {
  // remove all keys from T that are present in S and OmitAttributes
  [P in Exclude<keyof T, keyof S | OmitAttributes>]?: T[P];
} & {
  // add all keys from S to T
  [P in keyof S]: S[P];
} & {
  // make style properties optional
  style?: Partial<CSSStyleDeclaration>;
};

export type UI5StoryArgs<T, S> = Story<Override<T, S>>;
