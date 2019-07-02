import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://initiative";
const transform = "translate(48.5,35)";
const d = "M256 480q53 0 99.5 -20t81.5 -54.5t55 -81.5t20 -100t-20 -99.5t-55 -81.5t-81.5 -55t-99.5 -20t-100 20t-81.5 55t-54.5 81.5t-20 99.5t20 100t54.5 81.5t81.5 54.5t100 20zM256 0q46 0 87 17.5t71.5 48t48 71.5t17.5 87t-17.5 87t-48 71.5t-71.5 48t-87 17.5 q-47 0 -87.5 -17.5t-71 -48t-48 -71.5t-17.5 -87t17.5 -87t48 -71.5t71 -48t87.5 -17.5zM263 212q11 12 0 23l-62 63q-10 10 -10 23t10 22q9 10 22 10t23 -10l96 -97q9 -9 9 -22.5t-9 -22.5l-96 -97q-10 -10 -23 -10t-23 10q-9 9 -9 22.5t9 22.5z";

registerIcon(name, transform, d);

export default {name, transform, d};
