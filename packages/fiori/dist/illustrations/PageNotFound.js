import { registerIllustration } from "@ui5/webcomponents-base/dist/asset-registries/Illustrations.js";
import dialogSvg from "./sapIllus-Dialog-PageNotFound.js";
import sceneSvg from "./sapIllus-Scene-PageNotFound.js";
import spotSvg from "./sapIllus-Spot-PageNotFound.js";
import {
	IM_TITLE_PAGENOTFOUND,
	IM_SUBTITLE_PAGENOTFOUND,
} from "../generated/i18n/i18n-defaults.js";

const name = "PageNotFound";
const set = "fiori";
const title = IM_TITLE_PAGENOTFOUND;
const subtitle = IM_SUBTITLE_PAGENOTFOUND;

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