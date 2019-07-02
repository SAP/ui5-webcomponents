import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://my-view";
const transform = "translate(48.5,35)";
const d = "M352 288q0 -40 -28 -68t-68 -28t-68 28t-28 68t28 68t68 28t68 -28t28 -68zM256 224q26 0 45 18.5t19 45.5q0 26 -19 45t-45 19t-45 -19t-19 -45q0 -27 19 -45.5t45 -18.5zM480 448q14 0 23 -9.5t9 -22.5v-320q0 -14 -9 -23t-23 -9h-96h-256h-96q-14 0 -23 9t-9 23v320 q0 13 9 22.5t23 9.5h448zM352 96q0 24 -5.5 37t-14.5 19t-20.5 7t-23.5 1h-32h-32q-11 0 -22.5 -1t-20.5 -7t-15 -19t-6 -37h192zM480 416h-448v-320h96q0 53 25 74t71 22h32h32q48 0 72 -21.5t24 -74.5h96v320zM368 32q16 0 16 -16q0 -6 -4.5 -11t-11.5 -5h-224q-6 0 -11 5 t-5 11q0 7 5 11.5t11 4.5h224z";

registerIcon(name, transform, d);

export default {name, transform, d};
