import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://sys-help";
const transform = "translate(48.5,35)";
const d = "M256 480q53 0 100 -20t81.5 -54.5t54.5 -81.5t20 -100t-20 -99.5t-54.5 -81.5t-81.5 -55t-100 -20t-99.5 20t-81.5 55t-55 81.5t-20 99.5t20 100t55 81.5t81.5 54.5t99.5 20zM256 0q46 0 87 17.5t71.5 48t48 71.5t17.5 87t-17.5 87t-48 71.5t-71.5 48t-87 17.5t-87 -17.5 t-71.5 -48t-48 -71.5t-17.5 -87t17.5 -87t48 -71.5t71.5 -48t87 -17.5zM253 376q43 0 68.5 -21.5t25.5 -55.5q0 -22 -13 -36.5t-25 -28.5q-8 -9 -15 -15t-11.5 -13.5t-6.5 -18t0 -27.5h-49q0 16 0.5 27.5t4.5 21t12 18.5t22 21l21 17q7 5 14 16t7 21q0 15 -14.5 29t-37.5 14 t-38 -14.5t-19 -37.5h-49q0 14 7.5 29t21 27t32.5 19.5t42 7.5zM256 128q14 0 23 -9t9 -23q0 -13 -9 -22.5t-23 -9.5q-13 0 -22.5 9.5t-9.5 22.5q0 14 9.5 23t22.5 9z";

registerIcon(name, transform, d);

export default {name, transform, d};
