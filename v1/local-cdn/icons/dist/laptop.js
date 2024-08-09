import { isLegacyThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav4, ltr, accData } from "./v4/laptop.js";
import { pathData as pathDatav5 } from "./v5/laptop.js";

const pathData = isLegacyThemeFamily() ? pathDatav4 : pathDatav5;

export default "laptop";
export { pathData, ltr, accData };