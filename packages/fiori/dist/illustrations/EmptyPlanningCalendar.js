import { registerIllustration } from "@ui5/webcomponents-base/dist/asset-registries/Illustrations.js";
import dialogSvg from "./sapIllus-Dialog-EmptyPlanningCalendar.js";
import sceneSvg from "./sapIllus-Scene-EmptyPlanningCalendar.js";
import spotSvg from "./sapIllus-Spot-EmptyPlanningCalendar.js";
import {
	IM_TITLE_EMPTYPLANNINGCALENDAR,
	IM_SUBTITLE_EMPTYPLANNINGCALENDAR,
} from "../generated/i18n/i18n-defaults.js";

const name = "EmptyPlanningCalendar";
const set = "fiori";
const title = IM_TITLE_EMPTYPLANNINGCALENDAR;
const subtitle = IM_SUBTITLE_EMPTYPLANNINGCALENDAR;

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