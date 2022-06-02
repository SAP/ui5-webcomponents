import { registerIllustration } from "@ui5/webcomponents-base/dist/asset-registries/Illustrations.js";
import dialogSvg from "./sapIllus-Dialog-SearchEarth.js";
import sceneSvg from "./sapIllus-Scene-SearchEarth.js";
import spotSvg from "./sapIllus-Spot-SearchEarth.js";
import {
	IM_TITLE_BEFORESEARCH,
	IM_SUBTITLE_BEFORESEARCH,
} from "../generated/i18n/i18n-defaults.js";

const name = "SearchEarth";
const set = "fiori";
const title = IM_TITLE_BEFORESEARCH;
const subtitle = IM_SUBTITLE_BEFORESEARCH;

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