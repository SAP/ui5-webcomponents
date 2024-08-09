import { isLegacyThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav2, ltr, accData } from "./v2/task-optional.js";
import { pathData as pathDatav3 } from "./v3/task-optional.js";

const pathData = isLegacyThemeFamily() ? pathDatav2 : pathDatav3;

export default "tnt/task-optional";
export { pathData, ltr, accData };