import { registerIllustration } from "@ui5/webcomponents-base/dist/asset-registries/Illustrations.js";
import dialogSvg from "./tnt-Dialog-ChartBPMNFlow.js";
import sceneSvg from "./tnt-Scene-ChartBPMNFlow.js";
import spotSvg from "./tnt-Spot-ChartBPMNFlow.js";

const name = "ChartBPMNFlow";
const set = "tnt";

registerIllustration(name, {
	dialogSvg,
	sceneSvg,
	spotSvg,
	set,
});

export {
	dialogSvg,
	sceneSvg,
	spotSvg,
};