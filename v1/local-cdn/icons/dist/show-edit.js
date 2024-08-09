import { isLegacyThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav4, ltr, accData } from "./v4/show-edit.js";
import { pathData as pathDatav5 } from "./v5/show-edit.js";

const pathData = isLegacyThemeFamily() ? pathDatav4 : pathDatav5;

export default "show-edit";
export { pathData, ltr, accData };