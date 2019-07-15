import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://horizontal-waterfall-chart";
const viewBox = "0 -32 512 512";
const d = "M0 480h32V-32H0v512zM240 64V0H80v64h160zm112 64H240v64h112v-64zm160 128H352v64h160v-64zm0 128H80v64h432v-64z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
