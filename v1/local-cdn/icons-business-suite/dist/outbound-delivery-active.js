import { isLegacyThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav1, ltr, accData } from "./v1/outbound-delivery-active.js";
import { pathData as pathDatav2 } from "./v2/outbound-delivery-active.js";

const pathData = isLegacyThemeFamily() ? pathDatav1 : pathDatav2;

export default "business-suite/outbound-delivery-active";
export { pathData, ltr, accData };