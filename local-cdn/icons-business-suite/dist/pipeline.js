import { isLegacyThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav1, ltr, accData } from "./v1/pipeline.js";
import { pathData as pathDatav2 } from "./v2/pipeline.js";

const pathData = isLegacyThemeFamily() ? pathDatav1 : pathDatav2;

export default "business-suite/pipeline";
export { pathData, ltr, accData };