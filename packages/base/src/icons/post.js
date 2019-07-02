import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://post";
const transform = "translate(49.5,35)";
const d = "M448 448q27 0 45.5 -19t18.5 -45v-224q0 -26 -18.5 -45t-45.5 -19h-32v-75q0 -10 -6.5 -15.5t-14.5 -5.5q-7 0 -12 4l-79 91l-240 1q-26 0 -45 19t-19 45v224q0 26 19 45t45 19h384zM480 384q0 13 -9 22.5t-23 9.5h-384q-13 0 -22.5 -9.5t-9.5 -22.5v-224q0 -14 9.5 -23 t22.5 -9h256l64 -80v80h64q14 0 23 9t9 23v224z";

registerIcon(name, transform, d);

export default {name, transform, d};
