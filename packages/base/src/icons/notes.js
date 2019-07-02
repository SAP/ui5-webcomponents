import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://notes";
const transform = "translate(112.5,35)";
const d = "M272 288q16 0 16 -16q0 -6 -4.5 -11t-11.5 -5h-160q-6 0 -11 5t-5 11q0 7 5 11.5t11 4.5h160zM272 192q16 0 16 -16q0 -6 -4.5 -11t-11.5 -5h-160q-6 0 -11 5t-5 11q0 7 5 11.5t11 4.5h160zM272 96q16 0 16 -16q0 -6 -4.5 -11t-11.5 -5h-160q-6 0 -11 5t-5 11q0 7 5 11.5 t11 4.5h160zM352 448q14 0 23 -9.5t9 -22.5v-416q0 -14 -9 -23t-23 -9h-320q-14 0 -23 9t-9 23v416q0 13 9 22.5t23 9.5h64v32h32v-32h128v32h32v-32h64zM256 384h32v32h-32v-32zM96 384h32v32h-32v-32zM352 352h-320v-352h320v352z";

registerIcon(name, transform, d);

export default {name, transform, d};
