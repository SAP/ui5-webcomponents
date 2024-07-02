import { isLegacyThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav4, ltr, accData } from "./v4/screen-split-one.js";
import { pathData as pathDatav5 } from "./v5/screen-split-one.js";

const pathData = isLegacyThemeFamily() ? pathDatav4 : pathDatav5;

export default "screen-split-one";
export { pathData, ltr, accData };