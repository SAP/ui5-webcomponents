import { registerIllustration } from "@ui5/webcomponents-base/dist/asset-registries/Illustrations.js";
import dialogSvg from "./tnt-Dialog-ChartPie.js";
import sceneSvg from "./tnt-Scene-ChartPie.js";
import spotSvg from "./tnt-Spot-ChartPie.js";

const name = "ChartPie";
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