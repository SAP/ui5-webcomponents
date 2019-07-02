import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://sys-enter";
const transform = "translate(48.5,35)";
const d = "M256 480q53 0 100 -20t81.5 -54.5t54.5 -81.5t20 -100t-20 -99.5t-54.5 -81.5t-81.5 -55t-100 -20t-99.5 20t-81.5 55t-55 81.5t-20 99.5t20 100t55 81.5t81.5 54.5t99.5 20zM256 0q46 0 87 17.5t71.5 48t48 71t17.5 87.5q0 46 -17.5 87t-48 71.5t-71.5 48t-87 17.5 q-47 0 -87.5 -17.5t-71 -48t-48 -71.5t-17.5 -87q0 -47 17.5 -87.5t48 -71t71 -48t87.5 -17.5zM386 315q4 -3 4.5 -8t-2.5 -9l-145 -206q-3 -6 -10.5 -7t-13.5 4l-103 117q-5 4 -5 9.5t5 9.5l22 23q11 11 20 0l56 -54q5 -5 12 -4.5t11 8.5l103 136q4 7 10.5 8t12.5 -4z";

registerIcon(name, transform, d);

export default {name, transform, d};
