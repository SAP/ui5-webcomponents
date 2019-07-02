import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://message-error";
const transform = "translate(48.5,35)";
const d = "M257 146q15 0 26.5 -10.5t11.5 -27.5q0 -15 -11.5 -27t-26.5 -12q-17 0 -28 12t-11 27q0 17 11 27.5t28 10.5zM257 377q15 0 26.5 -10.5t11.5 -27.5l-18 -136q-3 -14 -7.5 -18t-12.5 -4t-13 3.5t-7 18.5l-19 136q0 17 11 27.5t28 10.5zM256 480q53 0 100 -20t81.5 -55 t54.5 -81.5t20 -99.5t-20 -100t-54.5 -81.5t-81.5 -54.5t-100 -20t-99.5 20t-81.5 54.5t-55 81.5t-20 100t20 99.5t55 81.5t81.5 55t99.5 20zM256 0q46 0 87 17.5t71.5 48t48 71t17.5 87.5q0 46 -17.5 87t-48 71.5t-71.5 48t-87 17.5t-87 -17.5t-71.5 -48t-48 -71.5 t-17.5 -87q0 -47 17.5 -87.5t48 -71t71.5 -48t87 -17.5z";

registerIcon(name, transform, d);

export default {name, transform, d};
