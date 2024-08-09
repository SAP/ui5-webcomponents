import { isLegacyThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav4, ltr, accData } from "./v4/navigation-up-arrow.js";
import { pathData as pathDatav5 } from "./v5/navigation-up-arrow.js";

const pathData = isLegacyThemeFamily() ? pathDatav4 : pathDatav5;

export default "navigation-up-arrow";
export { pathData, ltr, accData };