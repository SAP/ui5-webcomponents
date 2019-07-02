import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://cursor-arrow";
const transform = "translate(80.5,35)";
const d = "M440 100q9 -9 9 -22.5t-9 -22.5l-46 -45q-9 -10 -22 -10q-14 0 -23 10l-124 124v-61q0 -17 -12 -29t-29 -12q-11 0 -20.5 5.5t-14.5 15.5l-1 2l-1 2q-31 79 -59 150q-12 30 -24.5 61.5t-24 61t-21.5 54.5t-16 43q-3 8 2 14.5t13 6.5q3 0 5 -1q18 -6 43 -16t54 -21t61 -23 t62 -24q70 -27 149 -58l2 -1h1q13 -7 19 -20t3 -28q-4 -14 -15 -23t-25 -9h-61zM417 77l-124 125l-55 54h77h61q6 0 9 8q2 8 -5 11q-1 0 -18.5 7t-45.5 18t-63.5 24.5t-72.5 28t-72.5 28t-63.5 24.5q11 -28 25 -63.5t28.5 -72.5t28.5 -72.5t25 -63.5t18 -45.5t7 -18.5h1 q2 -5 7 -5q9 0 9 9v61v77l54 -55l125 -124z";

registerIcon(name, transform, d);

export default {name, transform, d};
