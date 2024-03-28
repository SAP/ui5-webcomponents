import { isLegacyThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav2, ltr, accData } from "./v2/instance-specification.js";
import { pathData as pathDatav3 } from "./v3/instance-specification.js";

const pathData = isLegacyThemeFamily() ? pathDatav2 : pathDatav3;

export default "tnt/instance-specification";
export { pathData, ltr, accData };