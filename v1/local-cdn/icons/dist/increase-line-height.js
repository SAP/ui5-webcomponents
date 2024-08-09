import { isLegacyThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav4, ltr, accData } from "./v4/increase-line-height.js";
import { pathData as pathDatav5 } from "./v5/increase-line-height.js";

const pathData = isLegacyThemeFamily() ? pathDatav4 : pathDatav5;

export default "increase-line-height";
export { pathData, ltr, accData };