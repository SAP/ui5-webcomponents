import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://payment-approval";
const transform = "translate(48.5,35)";
const d = "M512 447l-132 -159l-83 84l32 31l50 -50l101 127zM384 223v-224q0 -13 -9 -22.5t-23 -9.5h-320q-14 0 -23 9.5t-9 22.5v448q0 14 9 23.5t23 9.5h256v-33h-256v-448h320v224h32zM180 53v32q-26 1 -47 20t-25 57l41 5q3 -14 12 -25t19 -14v72q-32 12 -51.5 33t-19.5 45 q0 12 5 24.5t14.5 23.5t22.5 18.5t29 9.5v20h25v-20q58 -6 70 -63l-36 -6q-2 12 -11 20t-23 10v-76q42 -9 59 -31.5t17 -42.5q0 -32 -20.5 -54t-55.5 -25v-33h-25zM205 123q14 4 23.5 14.5t9.5 22.5q0 26 -33 35v-72zM155 283q0 -21 25 -31v64q-11 -5 -18 -14t-7 -19z";

registerIcon(name, transform, d);

export default {name, transform, d};
