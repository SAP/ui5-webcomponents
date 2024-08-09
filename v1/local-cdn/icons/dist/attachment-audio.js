import { isLegacyThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav4, ltr, accData } from "./v4/attachment-audio.js";
import { pathData as pathDatav5 } from "./v5/attachment-audio.js";

const pathData = isLegacyThemeFamily() ? pathDatav4 : pathDatav5;

export default "attachment-audio";
export { pathData, ltr, accData };