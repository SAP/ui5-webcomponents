import { registerIllustration } from "@ui5/webcomponents-base/dist/asset-registries/Illustrations.js";
import dialogSvg from "./sapIllus-Dialog-ReloadScreen.js";
import sceneSvg from "./sapIllus-Scene-ReloadScreen.js";
import spotSvg from "./sapIllus-Spot-ReloadScreen.js";
import {
	IM_TITLE_UNABLETOLOAD,
	IM_SUBTITLE_UNABLETOLOAD,
} from "../generated/i18n/i18n-defaults.js";

const name = "ReloadScreen";
const set = "fiori";
const title = IM_TITLE_UNABLETOLOAD;
const subtitle = IM_SUBTITLE_UNABLETOLOAD;

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