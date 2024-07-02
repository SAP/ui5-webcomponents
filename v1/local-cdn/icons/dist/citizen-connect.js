import { isLegacyThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav4, ltr, accData } from "./v4/citizen-connect.js";
import { pathData as pathDatav5 } from "./v5/citizen-connect.js";

const pathData = isLegacyThemeFamily() ? pathDatav4 : pathDatav5;

export default "citizen-connect";
export { pathData, ltr, accData };