import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://explorer";
const transform = "translate(38.5,35)";
const d = "M303 357h-77l38 57zM264 490q55 0 103.5 -21t84.5 -57t57 -84.5t21 -103.5q0 -54 -21 -102t-57 -84t-84.5 -57t-103.5 -21q-54 0 -102 21t-84 57t-57 84t-21 102q0 55 21 103.5t57 84.5t84 57t102 21zM264 -2q47 0 88.5 18t72.5 48.5t49 71.5t18 88t-18 88.5t-49 72.5 t-72.5 49t-88.5 18t-88 -18t-71.5 -49t-48.5 -72.5t-18 -88.5t18 -88t48.5 -71.5t71.5 -48.5t88 -18zM420 341q7 0 7 -8q0 -5 -2 -7l-132 -136q-3 -3 -4 -3l-175 -78q-1 -1 -4 -1q-8 3 -8 10q0 3 2 5l135 137l3 3q65 29 100.5 45t52 23.5t19.5 9l3 1.5q1 0 1.5 -0.5 t1.5 -0.5zM264 206q8 0 14 5t6 13t-6 14t-14 6t-13 -6t-5 -14t5 -13t13 -5z";

registerIcon(name, transform, d);

export default {name, transform, d};
