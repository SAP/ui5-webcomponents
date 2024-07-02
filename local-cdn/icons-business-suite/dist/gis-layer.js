import { isLegacyThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav1, ltr, accData } from "./v1/gis-layer.js";
import { pathData as pathDatav2 } from "./v2/gis-layer.js";

const pathData = isLegacyThemeFamily() ? pathDatav1 : pathDatav2;

export default "business-suite/gis-layer";
export { pathData, ltr, accData };