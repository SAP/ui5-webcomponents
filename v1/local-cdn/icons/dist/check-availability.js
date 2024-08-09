import { isLegacyThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav4, ltr, accData } from "./v4/check-availability.js";
import { pathData as pathDatav5 } from "./v5/check-availability.js";

const pathData = isLegacyThemeFamily() ? pathDatav4 : pathDatav5;

export default "check-availability";
export { pathData, ltr, accData };