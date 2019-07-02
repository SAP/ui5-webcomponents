import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://media-rewind";
const transform = "translate(80.5,35)";
const d = "M0 416q0 14 9.5 23t22.5 9q14 0 23 -9t9 -23v-385q0 -13 -9 -22.5t-23 -9.5q-13 0 -22.5 9.5t-9.5 22.5v385zM280 86q9 -9 9 -22.5t-9 -22.5q-10 -10 -23 -10t-22 10l-130 160q-9 9 -9 22.5t9 22.5l132 160q9 10 22.5 10t22.5 -10q10 -9 10 -22.5t-10 -22.5l-98 -126 q-5 -5 -5 -11.5t5 -11.5zM437 86q9 -9 9 -22.5t-9 -22.5q-10 -10 -23 -10t-23 10l-129 160q-10 9 -10 22.5t10 22.5l131 160q10 10 23 10t23 -10q9 -9 9 -22.5t-9 -22.5l-98 -126q-5 -5 -5 -11.5t5 -11.5z";

registerIcon(name, transform, d);

export default {name, transform, d};
