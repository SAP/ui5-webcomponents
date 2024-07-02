import { isLegacyThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav4, ltr, accData } from "./v4/enter-more.js";
import { pathData as pathDatav5 } from "./v5/enter-more.js";

const pathData = isLegacyThemeFamily() ? pathDatav4 : pathDatav5;

export default "enter-more";
export { pathData, ltr, accData };