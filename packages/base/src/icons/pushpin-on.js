import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://pushpin-on";
const transform = "translate(48.5,35)";
const d = "M353 64h31v-64q0 -14 -8.5 -23t-22.5 -9h-320q-14 0 -23.5 9t-9.5 23v352l128 128h128v-32h-96v-96q0 -14 -9 -23t-23 -9h-96v-320h321v64zM504 353q8 -8 8 -18t-8 -18q-7 -7 -18.5 -13.5t-25 -12t-27 -10.5t-25.5 -8q10 -29 3 -60t-30 -54l-68 68l-79 -79 q-5 -5 -11.5 -5t-11.5 5t-5 11t5 11l80 80l-68 67q23 23 53.5 30t59.5 -3q4 12 9 25.5t10.5 27t12 25.5t13.5 19q8 7 18 7t17 -7zM399 303q31 10 50 18.5t27 14.5l-77 77q-6 -9 -14 -28t-18 -50l-10 -31l-31 10q-26 9 -53 -1l103 -104q10 25 2 54l-10 30z";

registerIcon(name, transform, d);

export default {name, transform, d};
