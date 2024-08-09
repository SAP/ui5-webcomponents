import { isLegacyThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav1, ltr, accData } from "./v1/remove-folder.js";
import { pathData as pathDatav2 } from "./v2/remove-folder.js";

const pathData = isLegacyThemeFamily() ? pathDatav1 : pathDatav2;

export default "business-suite/remove-folder";
export { pathData, ltr, accData };