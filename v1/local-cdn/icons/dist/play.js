import { isLegacyThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav4, ltr, accData } from "./v4/play.js";
import { pathData as pathDatav5 } from "./v5/play.js";

const pathData = isLegacyThemeFamily() ? pathDatav4 : pathDatav5;

export default "play";
export { pathData, ltr, accData };