import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://overlay";
const transform = "translate(39.5,35)";
const d = "M256 480q53 0 100 -20t81.5 -55t54.5 -81.5t20 -99.5t-20 -100t-54.5 -82t-81.5 -55t-100 -20t-99.5 20t-81.5 55t-55 82t-20 100t20 99.5t55 81.5t81.5 55t99.5 20zM256 -1q46 0 87 17.5t71.5 48.5t48 71.5t17.5 87.5q0 46 -17.5 86.5t-48 71t-71.5 48t-87 17.5 t-87 -17.5t-71.5 -48t-48 -71t-17.5 -86.5q0 -47 17.5 -87.5t48 -71.5t71.5 -48.5t87 -17.5zM256 383q33 0 62.5 -12.5t51 -34t34 -50.5t12.5 -62t-12.5 -62.5t-34 -51.5t-51 -34.5t-62.5 -12.5t-62 12.5t-51 34.5t-34.5 51.5t-12.5 62.5t12.5 62t34.5 50.5t51 34t62 12.5z ";

registerIcon(name, transform, d);

export default {name, transform, d};
