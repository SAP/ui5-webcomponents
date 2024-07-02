import { isLegacyThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav4, ltr, accData } from "./v4/competitor.js";
import { pathData as pathDatav5 } from "./v5/competitor.js";

const pathData = isLegacyThemeFamily() ? pathDatav4 : pathDatav5;

export default "competitor";
export { pathData, ltr, accData };