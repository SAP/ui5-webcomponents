import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://sys-enter-2";
const transform = "translate(48.5,35)";
const d = "M256 480q53 0 100 -20t81.5 -54.5t54.5 -81.5t20 -100t-20 -99.5t-54.5 -81.5t-81.5 -55t-100 -20t-99.5 20t-81.5 55t-55 81.5t-20 99.5t20 100t55 81.5t81.5 54.5t99.5 20zM397 299q4 7 2.5 15.5t-6.5 13.5l-24 23q-8 6 -17 6q-14 0 -19 -11l-105 -138q-2 -3 -4 -3 q-1 0 -1.5 0.5t-1.5 0.5l-55 54q-8 8 -17 8q-10 0 -18 -8l-22 -22q-7 -7 -7 -16q0 -10 6 -16l105 -118q6 -7 17 -7q14 0 21 12z";

registerIcon(name, transform, d);

export default {name, transform, d};
