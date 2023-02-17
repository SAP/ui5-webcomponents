import type { Meta, StoryFn } from "@storybook/web-components";
import type { StoryArgsSlots } from "./argTypes.js";
import type { UI5StoryArgs } from "../../../types.js";
import type Tree from "@ui5/webcomponents/dist/Tree.js";
declare const _default: Meta<Tree>;
export default _default;
export declare const Basic: UI5StoryArgs<Tree, StoryArgsSlots>;
export declare const DynamicContent: StoryFn;
export declare const TreeWithCustomItems: UI5StoryArgs<Tree, StoryArgsSlots>;
