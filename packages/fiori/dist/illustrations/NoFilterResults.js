import { registerIllustration } from "@ui5/webcomponents-base/dist/asset-registries/Illustrations.js";
import dialogSvg from "./sapIllus-Dialog-NoFilterResults.js";
import sceneSvg from "./sapIllus-Scene-NoFilterResults.js";
import spotSvg from "./sapIllus-Spot-NoFilterResults.js";
import {
	IM_TITLE_NOFILTERRESULTS,
	IM_SUBTITLE_NOFILTERRESULTS,
} from "../generated/i18n/i18n-defaults.js";

const name = "NoFilterResults";
const set = "fiori";
const title = IM_TITLE_NOFILTERRESULTS;
const subtitle = IM_SUBTITLE_NOFILTERRESULTS;

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