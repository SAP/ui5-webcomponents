import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://legend";
const transform = "translate(128.5,35)";
const d = "M112 320q-20 0 -34 14t-14 34t14 34t34 14t34 -14t14 -34t-14 -34t-34 -14zM112 192q-20 0 -34 14t-14 34t14 34t34 14t34 -14t14 -34t-14 -34t-34 -14zM112 64q-20 0 -34 14t-14 34t14 34t34 14t34 -14t14 -34t-14 -34t-34 -14zM352 480q14 0 23 -9t9 -23v-448 q0 -13 -9 -22.5t-23 -9.5h-320q-14 0 -23 9.5t-9 22.5v448q0 14 9 23t23 9h320zM352 448h-320v-448h320v448zM304 384q16 0 16 -16q0 -6 -4.5 -11t-11.5 -5h-64q-6 0 -11 5t-5 11q0 7 5 11.5t11 4.5h64zM304 256q16 0 16 -16q0 -6 -4.5 -11t-11.5 -5h-64q-6 0 -11 5t-5 11 q0 7 5 11.5t11 4.5h64zM304 128q16 0 16 -16q0 -6 -4.5 -11t-11.5 -5h-64q-6 0 -11 5t-5 11q0 7 5 11.5t11 4.5h64z";

registerIcon(name, transform, d);

export default {name, transform, d};
