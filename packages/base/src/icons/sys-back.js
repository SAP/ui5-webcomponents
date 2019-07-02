import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://sys-back";
const transform = "translate(48.5,35)";
const d = "M0 224q0 53 20 100t55 81.5t81.5 54.5t99.5 20t100 -20t81.5 -54.5t54.5 -81.5t20 -100t-20 -99.5t-54.5 -81.5t-81.5 -55t-100 -20t-99.5 20t-81.5 55t-55 81.5t-20 99.5zM480 224q0 46 -17.5 87t-48 71.5t-71.5 48t-87 17.5t-87 -17.5t-71.5 -48t-48 -71.5t-17.5 -87 t17.5 -87t48 -71.5t71.5 -48t87 -17.5t87 17.5t71.5 48t48 71.5t17.5 87zM228 347q11 11 22 0q12 -12 0 -23l-96 -93q-6 -6 0 -11l97 -95q11 -12 0 -23q-12 -12 -23 0l-102 101q-9 9 -9 22t9 23zM335 347q11 11 22 0q12 -12 0 -23l-96 -93q-6 -6 0 -11l97 -95q11 -12 0 -23 q-12 -12 -23 0l-102 101q-9 9 -9 22t9 23z";

registerIcon(name, transform, d);

export default {name, transform, d};
