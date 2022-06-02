import { registerIllustration } from "@ui5/webcomponents-base/dist/asset-registries/Illustrations.js";
import dialogSvg from "./sapIllus-Dialog-AddColumn.js";
import sceneSvg from "./sapIllus-Scene-AddColumn.js";
import spotSvg from "./sapIllus-Spot-AddColumn.js";
import {
	IM_TITLE_ADDCOLUMN,
	IM_SUBTITLE_ADDCOLUMN,
} from "../generated/i18n/i18n-defaults.js";

const name = "AddColumn";
const set = "fiori";
const title = IM_TITLE_ADDCOLUMN;
const subtitle = IM_SUBTITLE_ADDCOLUMN;

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