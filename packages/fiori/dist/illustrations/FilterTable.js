import { registerIllustration } from "@ui5/webcomponents-base/dist/asset-registries/Illustrations.js";
import dialogSvg from "./sapIllus-Dialog-FilterTable.js";
import sceneSvg from "./sapIllus-Scene-FilterTable.js";
import spotSvg from "./sapIllus-Spot-FilterTable.js";
import {
	IM_TITLE_FILTERTABLE,
	IM_SUBTITLE_FILTERTABLE,
} from "../generated/i18n/i18n-defaults.js";

const name = "FilterTable";
const set = "fiori";
const title = IM_TITLE_FILTERTABLE;
const subtitle = IM_SUBTITLE_FILTERTABLE;

registerIllustration(name, {
	dialogSvg,
	sceneSvg,
	spotSvg,
	title,
	subtitle,
	set,
});

export {
	dialogSvg,
	sceneSvg,
	spotSvg,
};