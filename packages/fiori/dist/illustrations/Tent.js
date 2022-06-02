import { registerIllustration } from "@ui5/webcomponents-base/dist/asset-registries/Illustrations.js";
import dialogSvg from "./sapIllus-Dialog-Tent.js";
import sceneSvg from "./sapIllus-Scene-Tent.js";
import spotSvg from "./sapIllus-Spot-Tent.js";
import {
	IM_TITLE_NODATA,
	IM_SUBTITLE_NODATA,
} from "../generated/i18n/i18n-defaults.js";

const name = "Tent";
const set = "fiori";
const title = IM_TITLE_NODATA;
const subtitle = IM_SUBTITLE_NODATA;

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