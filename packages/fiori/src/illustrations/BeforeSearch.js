import { registerIllustration } from "@ui5/webcomponents-base/dist/asset-registries/Illustration.js";
import dialogSvg from "./sapIllus-Dialog-BeforeSearch.js";
import sceneSvg from "./sapIllus-Scene-BeforeSearch.js";
import spotSvg from "./sapIllus-Spot-BeforeSearch.js";
import {
	IM_TITLE_BEFORESEARCH,
	IM_SUBTITLE_BEFORESEARCH,
} from "../generated/i18n/i18n-defaults.js";

const name = "BeforeSearch";
const title = IM_TITLE_BEFORESEARCH;
const subtitle = IM_SUBTITLE_BEFORESEARCH;

registerIllustration(name, {
	dialogSvg,
	sceneSvg,
	spotSvg,
	title,
	subtitle,
});

export {
	dialogSvg,
	sceneSvg,
	spotSvg,
};
