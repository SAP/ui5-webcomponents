import { registerIllustration } from "@ui5/webcomponents-base/dist/asset-registries/Illustrations.js";
import dialogSvg from "./tnt-Dialog-ChartGantt.js";
import sceneSvg from "./tnt-Scene-ChartGantt.js";
import spotSvg from "./tnt-Spot-ChartGantt.js";

const name = "ChartGantt";
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