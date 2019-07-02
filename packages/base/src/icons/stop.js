import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://stop";
const transform = "translate(48.5,35)";
const d = "M256 480q53 0 99.5 -20t81.5 -54.5t55 -81.5t20 -100t-20 -99.5t-55 -81.5t-81.5 -55t-99.5 -20t-100 20t-81.5 55t-54.5 81.5t-20 99.5t20 100t54.5 81.5t81.5 54.5t100 20zM256 0q46 0 87 17.5t71.5 48t48 71.5t17.5 87t-17.5 87t-48 71.5t-71.5 48t-87 17.5 q-47 0 -87.5 -17.5t-71 -48t-48 -71.5t-17.5 -87t17.5 -87t48 -71.5t71 -48t87.5 -17.5zM320 320q13 0 22.5 -9t9.5 -23v-128q0 -13 -9.5 -22.5t-22.5 -9.5h-128q-14 0 -23 9.5t-9 22.5v128q0 14 9 23t23 9h128z";

registerIcon(name, transform, d);

export default {name, transform, d};
