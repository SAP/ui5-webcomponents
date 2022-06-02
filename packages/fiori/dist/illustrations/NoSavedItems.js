import { registerIllustration } from "@ui5/webcomponents-base/dist/asset-registries/Illustrations.js";
import dialogSvg from "./sapIllus-Dialog-NoSavedItems.js";
import sceneSvg from "./sapIllus-Scene-NoSavedItems.js";
import spotSvg from "./sapIllus-Spot-NoSavedItems.js";
import {
	IM_TITLE_NOSAVEDITEMS,
	IM_SUBTITLE_NOSAVEDITEMS,
} from "../generated/i18n/i18n-defaults.js";

const name = "NoSavedItems";
const set = "fiori";
const title = IM_TITLE_NOSAVEDITEMS;
const subtitle = IM_SUBTITLE_NOSAVEDITEMS;

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