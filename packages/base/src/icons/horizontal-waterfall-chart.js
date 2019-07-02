import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://horizontal-waterfall-chart";
const transform = "translate(48.5,35)";
const d = "M0 480h32v-512h-32v512v0zM240 64v-64h-160v64h160v0zM352 128h-112v64h112v-64v0zM512 256h-160v64h160v-64v0zM512 384h-432v64h432v-64v0z";

registerIcon(name, transform, d);

export default {name, transform, d};
