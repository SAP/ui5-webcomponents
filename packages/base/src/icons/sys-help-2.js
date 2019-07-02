import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://sys-help-2";
const transform = "translate(48.5,35)";
const d = "M256 480q53 0 99.5 -20t81.5 -54.5t55 -81.5t20 -100t-20 -99.5t-55 -81.5t-81.5 -55t-99.5 -20t-100 20t-81.5 55t-54.5 81.5t-20 99.5t20 100t54.5 81.5t81.5 54.5t100 20zM251 55q15 0 26 11t11 26t-11 25.5t-26 10.5t-25.5 -10.5t-10.5 -25.5t10.5 -26t25.5 -11z M352 294q0 32 -27 57t-77 25q-46 0 -72.5 -24t-29.5 -59h52q5 24 17.5 32.5t35.5 8.5t35 -12.5t12 -27.5q0 -10 -2.5 -14t-13.5 -15l-20 -17q-15 -12 -23 -21t-11.5 -18.5t-4.5 -21t-1 -27.5h50q0 12 0.5 19t3 12.5t7.5 10.5t15 13l27 25l16 18l9 16z";

registerIcon(name, transform, d);

export default {name, transform, d};
