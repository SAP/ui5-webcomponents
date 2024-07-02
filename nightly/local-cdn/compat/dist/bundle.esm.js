/* eslint-disable @typescript-eslint/no-unused-vars */
import testAssets from "@ui5/webcomponents/dist/bundle.common.bootstrap.js";
// Compat assets
import "./Assets.js";
import "@ui5/webcomponents/dist/Avatar.js";
import "@ui5/webcomponents/dist/Button.js";
import "@ui5/webcomponents/dist/Input.js";
import "@ui5/webcomponents/dist/Label.js";
import "@ui5/webcomponents/dist/Title.js";
import * as defaultFioriTexts from "./generated/i18n/i18n-defaults.js";
import "./Table.js";
import "./TableColumn.js";
import "./TableRow.js";
import "./TableGroupRow.js";
import "./TableCell.js";
testAssets.defaultTexts = { ...testAssets.defaultTexts, ...defaultFioriTexts };
export default testAssets;
//# sourceMappingURL=bundle.esm.js.map