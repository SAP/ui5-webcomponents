import { isLegacyThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav1, ltr, accData } from "./v1/2x2-grid-layout.js";
import { pathData as pathDatav2 } from "./v2/2x2-grid-layout.js";

const pathData = isLegacyThemeFamily() ? pathDatav1 : pathDatav2;

export default "business-suite/2x2-grid-layout";
export { pathData, ltr, accData };