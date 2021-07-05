import { registerIllustration } from "@ui5/webcomponents-base/dist/asset-registries/Illustrations.js";
import dialogSvg from "./sapIllus-Dialog-UnableToUpload.js";
import sceneSvg from "./sapIllus-Scene-UnableToUpload.js";
import spotSvg from "./sapIllus-Spot-UnableToUpload.js";
import {
	IM_TITLE_UNABLETOUPLOAD,
	IM_SUBTITLE_UNABLETOUPLOAD,
} from "../generated/i18n/i18n-defaults.js";

const name = "UnableToUpload";
const title = IM_TITLE_UNABLETOUPLOAD;
const subtitle = IM_SUBTITLE_UNABLETOUPLOAD;

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
