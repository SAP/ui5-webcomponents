import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://notification-2";
const transform = "translate(48.5,35)";
const d = "M368 352q16 0 16 -16q0 -6 -4.5 -11t-11.5 -5h-224q-6 0 -11 5t-5 11q0 7 5 11.5t11 4.5h224zM368 256q16 0 16 -16q0 -6 -4.5 -11t-11.5 -5h-224q-6 0 -11 5t-5 11q0 7 5 11.5t11 4.5h224zM448 448q27 0 45.5 -19t18.5 -45v-224q0 -26 -18.5 -45t-45.5 -19h-32v-75 q0 -10 -6.5 -15.5t-14.5 -5.5q-7 0 -12 4l-79 92h-240q-26 0 -45 19t-19 45v224q0 26 19 45t45 19h384zM480 384q0 13 -9 22.5t-23 9.5h-384q-13 0 -22.5 -9.5t-9.5 -22.5v-224q0 -14 9.5 -23t22.5 -9h256l64 -80v80h64q14 0 23 9t9 23v224z";

registerIcon(name, transform, d);

export default {name, transform, d};
