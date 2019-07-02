import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://media-forward";
const transform = "translate(80.5,35)";
const d = "M448 31q0 -13 -9.5 -22.5t-22.5 -9.5q-14 0 -23 9.5t-9 22.5v385q0 14 9 23t23 9q13 0 22.5 -9t9.5 -23v-385zM264 212q11 12 0 23l-98 126q-10 9 -10 22.5t10 22.5q9 10 22.5 10t22.5 -10l132 -160q9 -9 9 -22.5t-9 -22.5l-130 -160q-9 -10 -22 -10t-23 10q-9 9 -9 22.5 t9 22.5zM107 212q5 5 5 11.5t-5 11.5l-98 126q-9 9 -9 22.5t9 22.5q10 10 23 10t23 -10l131 -160q10 -9 10 -22.5t-10 -22.5l-129 -160q-10 -10 -23 -10t-23 10q-9 9 -9 22.5t9 22.5z";

registerIcon(name, transform, d);

export default {name, transform, d};
