import { isLegacyThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav4, ltr, accData } from "./v4/company-view.js";
import { pathData as pathDatav5 } from "./v5/company-view.js";

const pathData = isLegacyThemeFamily() ? pathDatav4 : pathDatav5;

export default "company-view";
export { pathData, ltr, accData };