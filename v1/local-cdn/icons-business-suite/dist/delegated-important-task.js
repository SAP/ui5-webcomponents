import { isLegacyThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav1, ltr, accData } from "./v1/delegated-important-task.js";
import { pathData as pathDatav2 } from "./v2/delegated-important-task.js";

const pathData = isLegacyThemeFamily() ? pathDatav1 : pathDatav2;

export default "business-suite/delegated-important-task";
export { pathData, ltr, accData };