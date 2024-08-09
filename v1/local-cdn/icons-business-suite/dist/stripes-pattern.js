import { isLegacyThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav1, ltr, accData } from "./v1/stripes-pattern.js";
import { pathData as pathDatav2 } from "./v2/stripes-pattern.js";

const pathData = isLegacyThemeFamily() ? pathDatav1 : pathDatav2;

export default "business-suite/stripes-pattern";
export { pathData, ltr, accData };