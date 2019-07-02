import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://system-exit";
const transform = "translate(48.5,35)";
const d = "M256 480q53 0 100 -20t81.5 -55t54.5 -81.5t20 -99.5t-20 -100t-54.5 -81.5t-81.5 -54.5t-100 -20t-99.5 20t-81.5 54.5t-55 81.5t-20 100t20 99.5t55 81.5t81.5 55t99.5 20zM256 0q46 0 87 17.5t71.5 48t48 71t17.5 87.5q0 46 -17.5 87t-48 71.5t-71.5 48t-87 17.5 t-87 -17.5t-71.5 -48t-48 -71.5t-17.5 -87q0 -47 17.5 -87.5t48 -71t71.5 -48t87 -17.5zM379 252q11 -11 0 -22q-12 -12 -23 0l-93 96q-6 6 -11 0l-95 -97q-12 -12 -23 0q-12 11 0 23l101 102q9 9 22 9t23 -9zM379 145q11 -11 0 -22q-12 -12 -23 0l-93 96q-6 6 -11 0 l-95 -97q-12 -12 -23 0q-12 11 0 23l101 102q9 9 22 9t23 -9z";

registerIcon(name, transform, d);

export default {name, transform, d};
