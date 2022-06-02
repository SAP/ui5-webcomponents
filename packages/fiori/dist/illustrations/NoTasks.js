import { registerIllustration } from "@ui5/webcomponents-base/dist/asset-registries/Illustrations.js";
import dialogSvg from "./sapIllus-Dialog-NoTasks.js";
import sceneSvg from "./sapIllus-Scene-NoTasks.js";
import spotSvg from "./sapIllus-Spot-NoTasks.js";
import {
	IM_TITLE_NOTASKS,
	IM_SUBTITLE_NOTASKS,
} from "../generated/i18n/i18n-defaults.js";

const name = "NoTasks";
const set = "fiori";
const title = IM_TITLE_NOTASKS;
const subtitle = IM_SUBTITLE_NOTASKS;

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