import { registerIllustration } from "@ui5/webcomponents-base/dist/asset-registries/Illustrations.js";
import dialogSvg from "./sapIllus-Dialog-GroupTable.js";
import sceneSvg from "./sapIllus-Scene-GroupTable.js";
import spotSvg from "./sapIllus-Spot-GroupTable.js";
import {
	IM_TITLE_GROUPTABLE,
	IM_SUBTITLE_GROUPTABLE,
} from "../generated/i18n/i18n-defaults.js";

const name = "GroupTable";
const set = "fiori";
const title = IM_TITLE_GROUPTABLE;
const subtitle = IM_SUBTITLE_GROUPTABLE;

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