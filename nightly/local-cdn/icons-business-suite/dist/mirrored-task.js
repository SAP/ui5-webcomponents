import { isLegacyThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav1, ltr, accData } from "./v1/mirrored-task.js";
import { pathData as pathDatav2 } from "./v2/mirrored-task.js";

const pathData = isLegacyThemeFamily() ? pathDatav1 : pathDatav2;

export default "business-suite/mirrored-task";
export { pathData, ltr, accData };