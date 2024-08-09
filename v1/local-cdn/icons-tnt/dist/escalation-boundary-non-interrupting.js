import { isLegacyThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav2, ltr, accData } from "./v2/escalation-boundary-non-interrupting.js";
import { pathData as pathDatav3 } from "./v3/escalation-boundary-non-interrupting.js";

const pathData = isLegacyThemeFamily() ? pathDatav2 : pathDatav3;

export default "tnt/escalation-boundary-non-interrupting";
export { pathData, ltr, accData };