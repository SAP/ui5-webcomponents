import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://ipad";
const transform = "translate(112.5,35)";
const d = "M352 480q14 0 23 -9.5t9 -22.5v-448q0 -14 -9 -23t-23 -9h-320q-14 0 -23 9t-9 23v448q0 13 9 22.5t23 9.5h320zM192 0q10 0 17 6.5t7 17.5q0 10 -7 17t-17 7t-17 -7t-7 -17q0 -11 7 -17.5t17 -6.5zM352 416h-320v-352h320v352z";

registerIcon(name, transform, d);

export default {name, transform, d};
