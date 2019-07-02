import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://increase-line-height";
const transform = "translate(80.5,35)";
const d = "M28 357q-5 -5 -11.5 -5t-11.5 5t-5 11.5t5 11.5l84 90q9 10 22.5 10t22.5 -10l85 -90q5 -5 5 -11.5t-5 -11.5t-11.5 -5t-11.5 5l-68 75v-160q0 -9 -4 -12.5t-12 -3.5q-16 0 -16 16v160zM6 67q-11 11 0 23q12 12 23 0l67 -75v161q0 16 16 16q9 0 12.5 -4.5t3.5 -11.5v-161 l68 75q12 12 23 0t0 -23l-85 -90q-9 -10 -22.5 -10t-22.5 10zM273 192q-16 0 -16 16t16 16h159q16 0 16 -16t-16 -16h-159zM273 0q-16 0 -16 16t16 16h159q16 0 16 -16t-16 -16h-159zM273 384q-16 0 -16 16t16 16h159q16 0 16 -16t-16 -16h-159z";

registerIcon(name, transform, d);

export default {name, transform, d};
