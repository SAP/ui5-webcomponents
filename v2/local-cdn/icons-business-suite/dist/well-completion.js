import { isLegacyThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav1, ltr, accData } from "./v1/well-completion.js";
import { pathData as pathDatav2 } from "./v2/well-completion.js";

const pathData = isLegacyThemeFamily() ? pathDatav1 : pathDatav2;

export default "business-suite/well-completion";
export { pathData, ltr, accData };