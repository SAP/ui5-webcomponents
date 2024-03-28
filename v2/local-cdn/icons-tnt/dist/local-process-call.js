import { isLegacyThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav2, ltr, accData } from "./v2/local-process-call.js";
import { pathData as pathDatav3 } from "./v3/local-process-call.js";

const pathData = isLegacyThemeFamily() ? pathDatav2 : pathDatav3;

export default "tnt/local-process-call";
export { pathData, ltr, accData };