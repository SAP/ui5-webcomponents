import { isLegacyThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav2, ltr, accData } from "./v2/systemtracks.js";
import { pathData as pathDatav3 } from "./v3/systemtracks.js";

const pathData = isLegacyThemeFamily() ? pathDatav2 : pathDatav3;

export default "tnt/systemtracks";
export { pathData, ltr, accData };