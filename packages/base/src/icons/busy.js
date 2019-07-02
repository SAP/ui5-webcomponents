import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://busy";
const transform = "translate(48.5,35)";
const d = "M256 480q53 0 100 -20t81.5 -55t54.5 -81.5t20 -99.5t-20 -100t-54.5 -81.5t-81.5 -54.5t-100 -20t-99.5 20t-81.5 54.5t-55 81.5t-20 100t20 99.5t55 81.5t81.5 55t99.5 20zM256 138q18 0 33.5 7t27 18.5t18.5 27t7 33.5t-7 33.5t-18.5 27t-27 18t-33.5 6.5 q-35 0 -60 -25t-25 -60q0 -18 6.5 -33.5t18 -27t27 -18.5t33.5 -7z";

registerIcon(name, transform, d);

export default {name, transform, d};
