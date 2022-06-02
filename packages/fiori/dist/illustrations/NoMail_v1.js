import { registerIllustration } from "@ui5/webcomponents-base/dist/asset-registries/Illustrations.js";
import dialogSvg from "./sapIllus-Dialog-NoMail_v1.js";
import sceneSvg from "./sapIllus-Scene-NoMail_v1.js";
import spotSvg from "./sapIllus-Spot-NoMail_v1.js";
import {
	IM_TITLE_NOMAIL,
	IM_SUBTITLE_NOMAIL,
} from "../generated/i18n/i18n-defaults.js";

const name = "NoMail_v1";
const set = "fiori";
const title = IM_TITLE_NOMAIL;
const subtitle = IM_SUBTITLE_NOMAIL;

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