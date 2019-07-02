import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://measuring-point";
const transform = "translate(48.5,35)";
const d = "M512 480v-480q0 -13 -9.5 -22.5t-22.5 -9.5h-224q-14 0 -23 9.5t-9 22.5v369q1 28 -5 50q-5 19 -18.5 34.5t-40.5 15.5q-4 -1 2.5 5t34.5 6q22 0 33.5 -15t17 -33t7 -33l1.5 -15v-64h96v-32h-96v-64h96v-32h-96v-64h96v-32h-96v-96h224v480h32zM91 413q-11 11 -22 0 q-5 -5 -5 -11.5t5 -11.5l75 -68h-128q-16 0 -16 -16t16 -16h128l-75 -69q-5 -5 -5 -11.5t5 -11.5t11 -5t11 5l92 86q9 10 9 23t-9 23z";

registerIcon(name, transform, d);

export default {name, transform, d};
