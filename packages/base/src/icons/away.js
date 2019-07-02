import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://away";
const transform = "translate(48.5,35)";
const d = "M256 480q53 0 100 -20t81.5 -55t54.5 -81.5t20 -99.5t-20 -99.5t-54.5 -81.5t-81.5 -55t-100 -20t-99.5 20t-81.5 55t-55 81.5t-20 99.5t20 99.5t55 81.5t81.5 55t99.5 20zM384 192q18 0 30.5 7t12.5 25q0 17 -12.5 24.5t-30.5 7.5h-96v96q0 18 -7 30.5t-25 12.5 q-17 0 -24.5 -12.5t-7.5 -30.5v-128q0 -18 7.5 -25t24.5 -7h128z";

registerIcon(name, transform, d);

export default {name, transform, d};
