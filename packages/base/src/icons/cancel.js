import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://cancel";
const transform = "translate(48.5,35)";
const d = "M256 480q53 0 99.5 -20t81.5 -54.5t55 -81.5t20 -100t-20 -99.5t-55 -81.5t-81.5 -55t-99.5 -20t-99.5 20t-81.5 55t-55 81.5t-20 99.5t20 100t55 81.5t81.5 54.5t99.5 20zM256 0q38 0 72.5 12.5t63.5 33.5l-314 314q-22 -29 -34 -63.5t-12 -72.5q0 -46 17.5 -87 t48 -71.5t71.5 -48t87 -17.5zM436 92q21 28 32.5 61.5t11.5 70.5q0 46 -17.5 87t-48 71.5t-71.5 48t-87 17.5q-37 0 -70.5 -11.5t-61.5 -31.5z";

registerIcon(name, transform, d);

export default {name, transform, d};
