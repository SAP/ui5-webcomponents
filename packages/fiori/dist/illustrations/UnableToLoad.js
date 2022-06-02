import { registerIllustration } from "@ui5/webcomponents-base/dist/asset-registries/Illustrations.js";
import dialogSvg from "./sapIllus-Dialog-UnableToLoad.js";
import sceneSvg from "./sapIllus-Scene-UnableToLoad.js";
import spotSvg from "./sapIllus-Spot-UnableToLoad.js";
import {
	IM_TITLE_UNABLETOLOAD,
	IM_SUBTITLE_UNABLETOLOAD,
} from "../generated/i18n/i18n-defaults.js";

const name = "UnableToLoad";
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