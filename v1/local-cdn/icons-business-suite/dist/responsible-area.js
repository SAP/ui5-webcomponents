import { isLegacyThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav1, ltr, accData } from "./v1/responsible-area.js";
import { pathData as pathDatav2 } from "./v2/responsible-area.js";

const pathData = isLegacyThemeFamily() ? pathDatav1 : pathDatav2;

export default "business-suite/responsible-area";
export { pathData, ltr, accData };