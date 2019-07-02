import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://cancel-maintenance";
const transform = "translate(50.5,35)";
const d = "M443 385l65 -65l-32 -32l-63 65l-65 -65l-32 32l65 65l-65 63l32 32l65 -64l63 64l32 -32zM270 266q6 19 6 39q0 29 -11 55t-30.5 45.5t-45 31t-55.5 11.5q-47 0 -83 -26.5t-51 -68.5h118q14 0 27.5 -9t13.5 -23v-32q0 -14 -13.5 -23.5t-27.5 -9.5h-118q15 -40 51 -66.5 t83 -26.5q29 0 52 10l163 -164q9 -9 23 -9q12 0 21 9l46 46q9 9 9 21.5t-9 22.5zM372 32l-163 164l-15 15l-19 -8q-24 -8 -41 -8q-22 0 -42 8t-35 22h61q13 0 26 5t23.5 14t17 20.5t6.5 24.5v32q0 13 -6.5 24.5t-17 19.5t-23.5 13t-26 5h-61q31 33 77 33q23 0 43 -9t35 -24 t23.5 -35t8.5 -43q0 -7 -1 -14t-4 -16l-5 -18l14 -13l168 -168z";

registerIcon(name, transform, d);

export default {name, transform, d};
