import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://sys-minus";
const transform = "translate(48.5,35)";
const d = "M256 480q53 0 100 -20t81.5 -54.5t54.5 -81.5t20 -100t-20 -99.5t-54.5 -81.5t-81.5 -55t-100 -20t-99.5 20t-81.5 55t-55 81.5t-20 99.5t20 100t55 81.5t81.5 54.5t99.5 20zM256 0q46 0 87 17.5t71.5 48t48 71.5t17.5 87t-17.5 87t-48 71.5t-71.5 48t-87 17.5t-87 -17.5 t-71.5 -48t-48 -71.5t-17.5 -87t17.5 -87t48 -71.5t71.5 -48t87 -17.5zM128 208v32h256v-32h-256z";

registerIcon(name, transform, d);

export default {name, transform, d};
