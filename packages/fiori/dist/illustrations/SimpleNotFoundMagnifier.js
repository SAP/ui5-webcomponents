import { registerIllustration } from "@ui5/webcomponents-base/dist/asset-registries/Illustrations.js";
import dialogSvg from "./sapIllus-Dialog-SimpleNotFoundMagnifier.js";
import sceneSvg from "./sapIllus-Scene-SimpleNotFoundMagnifier.js";
import spotSvg from "./sapIllus-Spot-SimpleNotFoundMagnifier.js";
import {
	IM_TITLE_NOSEARCHRESULTS,
	IM_SUBTITLE_NOSEARCHRESULTS,
} from "../generated/i18n/i18n-defaults.js";

const name = "SimpleNotFoundMagnifier";
const set = "fiori";
const title = IM_TITLE_NOSEARCHRESULTS;
const subtitle = IM_SUBTITLE_NOSEARCHRESULTS;

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