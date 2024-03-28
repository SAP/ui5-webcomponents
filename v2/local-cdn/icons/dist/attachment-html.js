import { isLegacyThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav4, ltr, accData } from "./v4/attachment-html.js";
import { pathData as pathDatav5 } from "./v5/attachment-html.js";

const pathData = isLegacyThemeFamily() ? pathDatav4 : pathDatav5;

export default "attachment-html";
export { pathData, ltr, accData };