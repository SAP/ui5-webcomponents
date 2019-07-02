import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://complete";
const transform = "translate(64.5,35)";
const d = "M416 160h32v-128q0 -14 -9.5 -23t-22.5 -9h-384q-14 0 -23 9t-9 23v384q0 13 9 22.5t23 9.5h128v-32h-128v-384h384v128zM476 455q7 -7 2 -16l-185 -272q-3 -6 -10 -7t-12 4l-125 139q-9 9 0 18l21 21q10 10 19 0l80 -80q5 -5 11.5 -4t9.5 8l146 207q3 6 9.5 7t11.5 -4z ";

registerIcon(name, transform, d);

export default {name, transform, d};
