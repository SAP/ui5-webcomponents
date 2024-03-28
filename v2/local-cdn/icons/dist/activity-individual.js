import { isLegacyThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav4, ltr, accData } from "./v4/activity-individual.js";
import { pathData as pathDatav5 } from "./v5/activity-individual.js";

const pathData = isLegacyThemeFamily() ? pathDatav4 : pathDatav5;

export default "activity-individual";
export { pathData, ltr, accData };