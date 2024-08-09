import { isLegacyThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav1, ltr, accData } from "./v1/context-menu.js";
import { pathData as pathDatav2 } from "./v2/context-menu.js";

const pathData = isLegacyThemeFamily() ? pathDatav1 : pathDatav2;

export default "business-suite/context-menu";
export { pathData, ltr, accData };