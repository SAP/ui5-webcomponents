import { isLegacyThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav4, ltr, accData } from "./v4/clinical-tast-tracker.js";
import { pathData as pathDatav5 } from "./v5/clinical-tast-tracker.js";

const pathData = isLegacyThemeFamily() ? pathDatav4 : pathDatav5;

export default "clinical-tast-tracker";
export { pathData, ltr, accData };