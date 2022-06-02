import { registerIllustration } from "@ui5/webcomponents-base/dist/asset-registries/Illustrations.js";
import dialogSvg from "./sapIllus-Dialog-EmptyList.js";
import sceneSvg from "./sapIllus-Scene-EmptyList.js";
import spotSvg from "./sapIllus-Spot-EmptyList.js";
import {
	IM_TITLE_NOENTRIES,
	IM_SUBTITLE_NOENTRIES,
} from "../generated/i18n/i18n-defaults.js";

const name = "EmptyList";
const set = "fiori";
const title = IM_TITLE_NOENTRIES;
const subtitle = IM_SUBTITLE_NOENTRIES;

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