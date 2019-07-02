import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://education";
const transform = "translate(48.5,35)";
const d = "M96 417q0 11 -9 19.5t-16 10.5h82q11 0 24.5 -10.5t14.5 -21.5v-192l-48 63l-48 -63v194zM478 447q16 0 25 -10t9 -26v-348q0 -14 -9.5 -23t-22.5 -9h-154q-22 0 -42 -12t-28 -19q-3 3 -11.5 8.5t-19.5 10.5t-23 8.5t-23 3.5h-147q-32 0 -32 32v352q0 11 7.5 21.5 t24.5 10.5h11q7 -2 13 -12.5t8 -19.5h-32v-320h162q10 0 18 -4t14 -9.5t9.5 -10.5t6.5 -8v320q-1 11 -9.5 21.5t-20.5 10.5q0 5 -3 11t-7.5 10.5t-8.5 7.5t-5 3q27 0 43.5 -9t20.5 -17q5 8 18 17t39 9h169zM480 415h-178q-18 0 -23.5 -12.5t-6.5 -20.5l-1 -319q3 3 6 8 t8 10.5t11 9.5t15 4h169v320z";

registerIcon(name, transform, d);

export default {name, transform, d};
