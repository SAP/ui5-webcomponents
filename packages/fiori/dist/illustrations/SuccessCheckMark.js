import { registerIllustration } from "@ui5/webcomponents-base/dist/asset-registries/Illustrations.js";
import dialogSvg from "./sapIllus-Dialog-SuccessCheckMark.js";
import sceneSvg from "./sapIllus-Scene-SuccessCheckMark.js";
import spotSvg from "./sapIllus-Spot-SuccessCheckMark.js";
import {
	IM_TITLE_SUCCESSSCREEN,
	IM_SUBTITLE_SUCCESSSCREEN,
} from "../generated/i18n/i18n-defaults.js";

const name = "SuccessCheckMark";
const set = "fiori";
const title = IM_TITLE_SUCCESSSCREEN;
const subtitle = IM_SUBTITLE_SUCCESSSCREEN;

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