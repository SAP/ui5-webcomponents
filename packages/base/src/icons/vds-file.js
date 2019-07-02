import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://vds-file";
const transform = "translate(48.5,35)";
const d = "M352 64h32v-64q0 -14 -9 -23t-23 -9h-320q-14 0 -23 9t-9 23v352l128 128h224q13 0 22.5 -9t9.5 -23v-64h-32v64h-192v-96q0 -14 -9.5 -23t-23.5 -9h-95v-320h320v64zM358 320q43 0 85.5 -23.5t68.5 -71.5q-26 -48 -68.5 -72t-85.5 -25h-1q-43 0 -85 24t-68 72 q26 48 68.5 72t85.5 24zM357 160q28 1 60.5 15.5t56.5 49.5q-24 35 -56.5 49t-59.5 14t-59.5 -14.5t-56.5 -49.5q20 -29 50.5 -46.5t64.5 -17.5zM358 269q19 0 32 -13t13 -32q0 -18 -13 -31t-32 -13t-32 13t-13 31q0 19 13 32t32 13z";

registerIcon(name, transform, d);

export default {name, transform, d};
