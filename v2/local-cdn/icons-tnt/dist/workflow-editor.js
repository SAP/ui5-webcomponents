import { isLegacyThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav2, ltr, accData } from "./v2/workflow-editor.js";
import { pathData as pathDatav3 } from "./v3/workflow-editor.js";

const pathData = isLegacyThemeFamily() ? pathDatav2 : pathDatav3;

export default "tnt/workflow-editor";
export { pathData, ltr, accData };