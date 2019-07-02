import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://accelerated";
const transform = "translate(80.5,35)";
const d = "M208 224q-6 0 -11 5t-5 11q0 7 5 11.5t11 4.5h128q16 0 16 -16q0 -6 -4.5 -11t-11.5 -5h-128zM80 160q-6 0 -11 5t-5 11q0 7 5 11.5t11 4.5h160q16 0 16 -16q0 -6 -4.5 -11t-11.5 -5h-160zM96 112q0 7 5 11.5t11 4.5h256q16 0 16 -16q0 -6 -4.5 -11t-11.5 -5h-256 q-6 0 -11 5t-5 11zM416 448q14 0 23 -9.5t9 -22.5v-416q0 -14 -9 -23t-23 -9h-384q-14 0 -23 9t-9 23v416q0 13 9 22.5t23 9.5h64v32h32v-32h192v32h32v-32h64zM320 384h32v32h-32v-32zM96 384h32v32h-32v-32zM416 352h-384v-352h384v352z";

registerIcon(name, transform, d);

export default {name, transform, d};
