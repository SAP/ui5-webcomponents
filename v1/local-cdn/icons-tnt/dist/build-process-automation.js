import { isLegacyThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav2, ltr, accData } from "./v2/build-process-automation.js";
import { pathData as pathDatav3 } from "./v3/build-process-automation.js";

const pathData = isLegacyThemeFamily() ? pathDatav2 : pathDatav3;

export default "tnt/build-process-automation";
export { pathData, ltr, accData };