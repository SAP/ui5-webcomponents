import { isLegacyThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav4, ltr, accData } from "./v4/space-navigation.js";
import { pathData as pathDatav5 } from "./v5/space-navigation.js";

const pathData = isLegacyThemeFamily() ? pathDatav4 : pathDatav5;

export default "space-navigation";
export { pathData, ltr, accData };