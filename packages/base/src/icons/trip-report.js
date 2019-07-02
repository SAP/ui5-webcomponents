import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://trip-report";
const transform = "translate(48.5,35)";
const d = "M448 352q27 0 45.5 -19t18.5 -45v-224q0 -26 -18.5 -45t-45.5 -19h-384q-26 0 -45 19t-19 45v224q0 26 19 45t45 19h96v32q0 26 19 45t45 19h64q27 0 45.5 -19t18.5 -45v-32h96zM192 352h128v32q0 14 -9 23t-23 9h-64q-13 0 -22.5 -9t-9.5 -23v-32zM480 288q0 14 -9 23 t-23 9h-384q-13 0 -22.5 -9t-9.5 -23v-224q0 -14 9.5 -23t22.5 -9h384q14 0 23 9t9 23v224zM234 159l60 -71q-8 -5 -17 -8t-19 -4q-21 -2 -39.5 3.5t-33.5 17.5t-25 29.5t-12 37.5q-4 38 17.5 68t57.5 39zM261 195l-5 95q28 1 52 -10.5t40 -31.5zM357 216q7 -15 9 -33 q2 -27 -8 -50.5t-28 -40.5l-55 71z";

registerIcon(name, transform, d);

export default {name, transform, d};
