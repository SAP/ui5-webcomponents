import { isLegacyThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav4, ltr, accData } from "./v4/lead-outdated.js";
import { pathData as pathDatav5 } from "./v5/lead-outdated.js";

const pathData = isLegacyThemeFamily() ? pathDatav4 : pathDatav5;

export default "lead-outdated";
export { pathData, ltr, accData };