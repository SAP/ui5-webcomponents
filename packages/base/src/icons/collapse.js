import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://collapse";
const transform = "translate(64.5,35)";
const d = "M128 208h256v32h-256v-32zM448 448h-128v-32h128v-384h-384v256h-32v-256q0 -14 9 -23t23 -9h384q13 0 22.5 9t9.5 23v384q0 13 -9.5 22.5t-22.5 9.5zM227 442q11 12 23 0q5 -5 5 -11t-5 -11l-99 -92q-10 -9 -23 -9t-22 9l-101 92q-5 5 -5 11.5t5 11.5t11.5 5t11.5 -5 l95 -87q5 -6 11 0z";

registerIcon(name, transform, d);

export default {name, transform, d};
