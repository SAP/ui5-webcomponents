import { isLegacyThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav1, ltr, accData } from "./v1/variant-configuration.js";
import { pathData as pathDatav2 } from "./v2/variant-configuration.js";

const pathData = isLegacyThemeFamily() ? pathDatav1 : pathDatav2;

export default "business-suite/variant-configuration";
export { pathData, ltr, accData };