import { isLegacyThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav2, ltr, accData } from "./v2/communication-path.js";
import { pathData as pathDatav3 } from "./v3/communication-path.js";

const pathData = isLegacyThemeFamily() ? pathDatav2 : pathDatav3;

export default "tnt/communication-path";
export { pathData, ltr, accData };