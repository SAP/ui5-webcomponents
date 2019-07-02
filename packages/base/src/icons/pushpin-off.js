import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://pushpin-off";
const transform = "translate(96.5,35)";
const d = "M406 325q10 -9 10 -22t-10 -23q-9 -9 -23.5 -17t-32 -15.5t-35 -14t-32.5 -11.5q12 -37 3.5 -76.5t-38.5 -68.5l-90 90l-131 -130q-11 -12 -23 0q-5 5 -5 11t5 11l131 131l-91 90q30 30 69 38.5t77 -3.5q4 15 10.5 32.5t14 35t16 32.5t17.5 24q10 9 23 9t22 -9zM271 416 q-11 -11 -24 -40t-26 -71l-10 -30l-31 9q-22 8 -44.5 6t-42.5 -13l152 -152q11 20 13 42.5t-6 45.5l-10 30l31 10q31 10 51.5 18t33 14.5t18.5 11t8 6.5z";

registerIcon(name, transform, d);

export default {name, transform, d};
