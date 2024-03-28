import { isLegacyThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav4, ltr, accData } from "./v4/learning-assistant.js";
import { pathData as pathDatav5 } from "./v5/learning-assistant.js";

const pathData = isLegacyThemeFamily() ? pathDatav4 : pathDatav5;

export default "learning-assistant";
export { pathData, ltr, accData };