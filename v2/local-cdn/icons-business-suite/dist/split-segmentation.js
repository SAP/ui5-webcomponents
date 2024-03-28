import { isLegacyThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav1, ltr, accData } from "./v1/split-segmentation.js";
import { pathData as pathDatav2 } from "./v2/split-segmentation.js";

const pathData = isLegacyThemeFamily() ? pathDatav1 : pathDatav2;

export default "business-suite/split-segmentation";
export { pathData, ltr, accData };