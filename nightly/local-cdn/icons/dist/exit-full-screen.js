import { isLegacyThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav4, ltr, accData } from "./v4/exit-full-screen.js";
import { pathData as pathDatav5 } from "./v5/exit-full-screen.js";

const pathData = isLegacyThemeFamily() ? pathDatav4 : pathDatav5;

export default "exit-full-screen";
export { pathData, ltr, accData };