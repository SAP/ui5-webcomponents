import { registerIllustration } from "@ui5/webcomponents-base/dist/asset-registries/Illustrations.js";
import dialogSvg from "./tnt-Dialog-ChartBullet.js";
import sceneSvg from "./tnt-Scene-ChartBullet.js";
import spotSvg from "./tnt-Spot-ChartBullet.js";

const name = "ChartBullet";
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