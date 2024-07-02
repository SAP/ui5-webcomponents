import { isLegacyThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav1, ltr, accData } from "./v1/return-delivery.js";
import { pathData as pathDatav2 } from "./v2/return-delivery.js";

const pathData = isLegacyThemeFamily() ? pathDatav1 : pathDatav2;

export default "business-suite/return-delivery";
export { pathData, ltr, accData };