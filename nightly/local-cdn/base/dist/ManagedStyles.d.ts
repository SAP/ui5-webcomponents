import type { StyleData, StyleDataCSP } from "./types.js";
declare const createStyle: (data: StyleData, name: string, value?: string, theme?: string) => void;
declare const updateStyle: (data: StyleData, name: string, value?: string, theme?: string) => void;
declare const hasStyle: (name: string, value?: string) => boolean;
declare const removeStyle: (name: string, value?: string) => void;
declare const createOrUpdateStyle: (data: StyleData, name: string, value?: string, theme?: string) => void;
declare const mergeStyles: (style1?: StyleData, style2?: StyleData) => StyleData | undefined;
export { createStyle, hasStyle, updateStyle, removeStyle, createOrUpdateStyle, mergeStyles, };
export type { StyleData, StyleDataCSP, };
