import { isLegacyThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav1, ltr, accData } from "./v1/split-screen.js";
import { pathData as pathDatav2 } from "./v2/split-screen.js";

const pathData = isLegacyThemeFamily() ? pathDatav1 : pathDatav2;

export default "business-suite/split-screen";
export { pathData, ltr, accData };