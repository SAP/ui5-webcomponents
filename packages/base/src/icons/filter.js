import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://filter";
const transform = "translate(80,35)";
const d = "M416 448q20 0 28.5 -17t-2.5 -33q-12 -12 -23 -26q-11 -12 -23 -27t-26 -30q-32 -36 -73 -82q-9 -9 -9 -23v-114l-101 -91q-4 -5 -11 -5q-6 0 -11 4t-5 12v194q0 13 -10 23l-72 82q-14 15 -27 30t-23 26.5t-16 19l-6 7.5q-11 16 -2.5 33t28.5 17h384zM274 255 q40 45 71 80q13 15 25.5 29.5t22.5 26t16.5 18.5l6.5 7h-384l6 -7.5t16 -18.5t22.5 -25.5t26.5 -29.5q31 -35 71 -80q18 -20 18 -45v-158l64 58v100q0 27 18 45z";

registerIcon(name, transform, d);

export default {name, transform, d};
