import { isLegacyThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav4, ltr, accData } from "./v4/time-overtime.js";
import { pathData as pathDatav5 } from "./v5/time-overtime.js";

const pathData = isLegacyThemeFamily() ? pathDatav4 : pathDatav5;

export default "time-overtime";
export { pathData, ltr, accData };