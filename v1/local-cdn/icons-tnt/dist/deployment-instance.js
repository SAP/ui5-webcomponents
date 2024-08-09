import { isLegacyThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav2, ltr, accData } from "./v2/deployment-instance.js";
import { pathData as pathDatav3 } from "./v3/deployment-instance.js";

const pathData = isLegacyThemeFamily() ? pathDatav2 : pathDatav3;

export default "tnt/deployment-instance";
export { pathData, ltr, accData };