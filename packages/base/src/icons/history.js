import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://history";
const transform = "translate(48.5,35)";
const d = "M256 480q53 0 99.5 -20t81.5 -55t55 -81.5t20 -99.5t-20 -99.5t-55 -81.5t-81.5 -55t-99.5 -20t-100 20t-81.5 55t-54.5 81.5t-20 99.5t20 99.5t54.5 81.5t81.5 55t100 20zM256 0q46 0 87 17.5t71.5 48t48 71t17.5 87.5q0 46 -17.5 87t-48 71.5t-71.5 48t-87 17.5 q-47 0 -87.5 -17.5t-71 -48t-48 -71.5t-17.5 -87q0 -47 17.5 -87.5t48 -71t71 -48t87.5 -17.5zM400 224q6 0 11 -4.5t5 -11.5t-5 -11.5t-11 -4.5h-144h-16h-16v16v16v112q0 16 16 16q6 0 11 -4.5t5 -11.5v-112h144z";

registerIcon(name, transform, d);

export default {name, transform, d};
