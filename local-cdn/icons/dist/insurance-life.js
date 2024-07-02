import { isLegacyThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav4, ltr, accData } from "./v4/insurance-life.js";
import { pathData as pathDatav5 } from "./v5/insurance-life.js";

const pathData = isLegacyThemeFamily() ? pathDatav4 : pathDatav5;

export default "insurance-life";
export { pathData, ltr, accData };