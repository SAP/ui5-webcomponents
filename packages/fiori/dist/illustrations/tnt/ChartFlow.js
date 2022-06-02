import { registerIllustration } from "@ui5/webcomponents-base/dist/asset-registries/Illustrations.js";
import dialogSvg from "./tnt-Dialog-ChartFlow.js";
import sceneSvg from "./tnt-Scene-ChartFlow.js";
import spotSvg from "./tnt-Spot-ChartFlow.js";

const name = "ChartFlow";
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