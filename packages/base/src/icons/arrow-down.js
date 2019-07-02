import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://arrow-down";
const transform = "translate(48.5,35)";
const d = "M256 480q53 0 100 -20t81.5 -54.5t54.5 -81.5t20 -100t-20 -99.5t-54.5 -81.5t-81.5 -55t-100 -20t-99.5 20t-81.5 55t-55 81.5t-20 99.5t20 100t55 81.5t81.5 54.5t99.5 20zM256 0q46 0 87 17.5t71.5 48t48 71.5t17.5 87t-17.5 87t-48 71.5t-71.5 48t-87 17.5t-87 -17.5 t-71.5 -48t-48 -71.5t-17.5 -87t17.5 -87t48 -71.5t71.5 -48t87 -17.5zM355 251q11 12 23 0q5 -5 5 -11t-5 -11l-99 -92q-10 -9 -23 -9t-22 9l-101 92q-5 5 -5 11.5t5 11.5t11.5 5t11.5 -5l95 -87q5 -6 11 0z";

registerIcon(name, transform, d);

export default {name, transform, d};
