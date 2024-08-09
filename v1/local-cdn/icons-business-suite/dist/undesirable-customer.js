import { isLegacyThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav1, ltr, accData } from "./v1/undesirable-customer.js";
import { pathData as pathDatav2 } from "./v2/undesirable-customer.js";

const pathData = isLegacyThemeFamily() ? pathDatav1 : pathDatav2;

export default "business-suite/undesirable-customer";
export { pathData, ltr, accData };