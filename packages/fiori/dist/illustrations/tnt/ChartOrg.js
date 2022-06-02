import { registerIllustration } from "@ui5/webcomponents-base/dist/asset-registries/Illustrations.js";
import dialogSvg from "./tnt-Dialog-ChartOrg.js";
import sceneSvg from "./tnt-Scene-ChartOrg.js";
import spotSvg from "./tnt-Spot-ChartOrg.js";

const name = "ChartOrg";
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