import { registerThemeBundle } from "@ui5/webcomponents-base/src/sap/ui/webcomponents/base/theming/ThemeBundle";

import belizeThemeBundle from "./themes/sap_belize/theme-bundle.json";
import belizeHcbThemeBundle from "./themes/sap_belize_hcb/theme-bundle.json";
import fiori3ThemeBundle from "./themes/sap_fiori_3/theme-bundle.json";

registerThemeBundle("@ui5/webcomponents", "sap_belize", belizeThemeBundle);
registerThemeBundle("@ui5/webcomponents", "sap_belize_hcb", belizeHcbThemeBundle);
registerThemeBundle("@ui5/webcomponents", "sap_fiori_3", fiori3ThemeBundle);
