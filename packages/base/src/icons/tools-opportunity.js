import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://tools-opportunity";
const transform = "translate(48.5,35)";
const d = "M256 480q53 0 99.5 -20t81.5 -54.5t55 -81.5t20 -100t-20 -99.5t-55 -81.5t-81.5 -55t-99.5 -20t-100 20t-81.5 55t-54.5 81.5t-20 99.5t20 100t54.5 81.5t81.5 54.5t100 20zM384 41q43 30 69.5 78t26.5 105q0 46 -17.5 87t-48 71.5t-71.5 48t-87 17.5q-47 0 -87.5 -17.5 t-71 -48t-48 -71.5t-17.5 -87h111q40 0 68 28t28 68v48l-37 -44q-5 -5 -11.5 -5t-11.5 5t-5 11t5 11l54 61q10 9 23 9t23 -9l51 -61q5 -5 5 -11t-5 -11t-11.5 -5t-11.5 5l-36 44v-48q0 -27 -10 -50t-27.5 -40.5t-41 -27.5t-49.5 -10h-109l7 -32q11 -37 33.5 -67t53.5 -52v47 q0 8 8 8h48q8 0 8 -8v-78q8 -2 16 -3.5t16 -3.5v149q0 8 8 8h48q8 0 8 -8v-149q8 2 15.5 3.5t15.5 3.5v238q0 8 9 8h48q8 0 8 -8v-207z";

registerIcon(name, transform, d);

export default {name, transform, d};
