import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://attachment-photo";
const transform = "translate(48.5,35)";
const d = "M512 381v-313h-287v313h287zM480 352h-223v-224h223v224zM411 268q0 -15 -11 -25.5t-26 -10.5t-26 10.5t-11 25.5q0 18 11.5 27t25.5 9t25.5 -9t11.5 -27zM315 160v53q0 19 18 19h86q17 0 17 -19v-53h-121zM352 32h32v-32q0 -14 -9 -23t-23 -9h-320q-14 0 -23 9t-9 23 v352l128 128h224q13 0 22.5 -9t9.5 -23v-32h-32v32h-192v-96q0 -14 -9.5 -23t-23.5 -9h-95v-320h320v32z";

registerIcon(name, transform, d);

export default {name, transform, d};
