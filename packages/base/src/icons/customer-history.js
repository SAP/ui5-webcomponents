import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://customer-history";
const transform = "translate(48.5,35)";
const d = "M384 128q36 0 60.5 -10t39.5 -27.5t21.5 -41t6.5 -49.5v-32h-320v32q0 26 7 49.5t22 41t39.5 27.5t59.5 10h32h32zM480 0q0 40 -28 68t-68 28h-64q-40 0 -68 -28t-28 -68h256zM448 224q0 -40 -28 -68t-68 -28t-68 28t-28 68t28 68t68 28t68 -28t28 -68zM352 160 q26 0 45 19t19 45t-19 45t-45 19t-45 -19t-19 -45t19 -45t45 -19zM32 272q0 -30 9.5 -57.5t26.5 -49.5t40.5 -38t51.5 -24v-33q-35 8 -64 26.5t-50.5 45.5t-33.5 60t-12 70q0 43 16.5 81t44.5 66t66 44.5t81 16.5q56 0 101.5 -26t73.5 -70h-39q-25 29 -59.5 46.5t-76.5 17.5 q-36 0 -68 -14t-56 -38t-38 -56t-14 -68zM97 272q0 7 5 11.5t11 4.5h79v112q0 7 5 11.5t11 4.5q16 0 16 -16v-144h-111q-6 0 -11 4.5t-5 11.5z";

registerIcon(name, transform, d);

export default {name, transform, d};
