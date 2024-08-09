import { isLegacyThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav4, ltr, accData } from "./v4/employee-pane.js";
import { pathData as pathDatav5 } from "./v5/employee-pane.js";

const pathData = isLegacyThemeFamily() ? pathDatav4 : pathDatav5;

export default "employee-pane";
export { pathData, ltr, accData };