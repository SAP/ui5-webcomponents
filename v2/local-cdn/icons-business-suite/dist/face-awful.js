import { isLegacyThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav1, ltr, accData } from "./v1/face-awful.js";
import { pathData as pathDatav2 } from "./v2/face-awful.js";

const pathData = isLegacyThemeFamily() ? pathDatav1 : pathDatav2;

export default "business-suite/face-awful";
export { pathData, ltr, accData };