import { isLegacyThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav1, ltr, accData } from "./v1/draw-freehand.js";
import { pathData as pathDatav2 } from "./v2/draw-freehand.js";

const pathData = isLegacyThemeFamily() ? pathDatav1 : pathDatav2;

export default "business-suite/draw-freehand";
export { pathData, ltr, accData };