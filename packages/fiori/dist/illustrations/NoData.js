import { registerIllustration } from "@ui5/webcomponents-base/dist/asset-registries/Illustrations.js";
import dialogSvg from "./sapIllus-Dialog-NoData.js";
import sceneSvg from "./sapIllus-Scene-NoData.js";
import spotSvg from "./sapIllus-Spot-NoData.js";
import {
	IM_TITLE_NODATA,
	IM_SUBTITLE_NODATA,
} from "../generated/i18n/i18n-defaults.js";

const name = "NoData";
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