import { isLegacyThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav4, ltr, accData } from "./v4/gantt-bars.js";
import { pathData as pathDatav5 } from "./v5/gantt-bars.js";

const pathData = isLegacyThemeFamily() ? pathDatav4 : pathDatav5;

export default "gantt-bars";
export { pathData, ltr, accData };