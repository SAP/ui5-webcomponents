import testAssets from "@ui5/webcomponents/dist/bundle.esm.js";
import * as defaultFioriTexts from "./generated/i18n/i18n-defaults.js";

// FIORI assets
import "./Assets.js";

import "./bundle.common.js";
import BarcodeScannerDialog from "./BarcodeScannerDialog.js";

testAssets.defaultTexts = {...testAssets.defaultTexts, ...defaultFioriTexts };
export default testAssets;
