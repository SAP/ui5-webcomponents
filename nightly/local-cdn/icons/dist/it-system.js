import { isLegacyThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav4, ltr, accData } from "./v4/it-system.js";
import { pathData as pathDatav5 } from "./v5/it-system.js";

const pathData = isLegacyThemeFamily() ? pathDatav4 : pathDatav5;

export default "it-system";
export { pathData, ltr, accData };