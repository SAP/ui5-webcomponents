import { isLegacyThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav1, ltr, accData } from "./v1/plain-grid-layout.js";
import { pathData as pathDatav2 } from "./v2/plain-grid-layout.js";

const pathData = isLegacyThemeFamily() ? pathDatav1 : pathDatav2;

export default "business-suite/plain-grid-layout";
export { pathData, ltr, accData };