import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://action";
const transform = "translate(48.5,35)";
const d = "M416 161h32v-129q0 -13 -9 -22.5t-23 -9.5h-384q-13 0 -22.5 9.5t-9.5 22.5v384q0 14 9.5 23t22.5 9h128v-32h-128v-384h384v129zM503 390q9 -10 9 -23t-9 -23l-92 -84q-5 -5 -11 -5t-11 5t-5 11.5t5 11.5l75 69h-48q-40 0 -75 -15t-61 -41.5t-41 -61.5t-15 -74v-16 q0 -16 -16 -16t-16 16v11v7.5t1 4.5q1 45 19.5 84.5t48.5 68.5t70 46t85 17h48l-75 69q-5 5 -5 11.5t5 11.5t11 5t11 -5z";

registerIcon(name, transform, d);

export default {name, transform, d};
