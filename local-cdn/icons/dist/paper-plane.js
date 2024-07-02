import { isLegacyThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav4, ltr, accData } from "./v4/paper-plane.js";
import { pathData as pathDatav5 } from "./v5/paper-plane.js";

const pathData = isLegacyThemeFamily() ? pathDatav4 : pathDatav5;

export default "paper-plane";
export { pathData, ltr, accData };