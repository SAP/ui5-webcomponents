import { isLegacyThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav4, ltr, accData } from "./v4/sound-off.js";
import { pathData as pathDatav5 } from "./v5/sound-off.js";

const pathData = isLegacyThemeFamily() ? pathDatav4 : pathDatav5;

export default "sound-off";
export { pathData, ltr, accData };