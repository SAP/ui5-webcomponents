import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://repost";
const transform = "translate(47.75,35)";
const d = "M416 128h32v-96q0 -13 -9 -22.5t-23 -9.5h-320q-13 0 -22.5 9.5t-9.5 22.5v144l-36 -44q-5 -5 -11.5 -5t-11.5 5t-5 11t5 11l51 61q10 9 23 9t23 -9l54 -61q11 -11 0 -22q-12 -11 -23 0l-37 44v-144h320v96zM508 315q11 -11 0 -22l-54 -60q-10 -9 -23 -9t-23 9l-51 60 q-5 5 -5 11t5 11q11 11 23 0l36 -43v144h-320v-96h-32v96q0 14 9.5 23t22.5 9h320q14 0 23 -9t9 -23v-144l37 43q11 11 23 0z";

registerIcon(name, transform, d);

export default {name, transform, d};
