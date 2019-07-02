import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://suitcase";
const transform = "translate(48.5,35)";
const d = "M448 352q27 0 45.5 -19t18.5 -45v-224q0 -26 -18.5 -45t-45.5 -19h-384q-26 0 -45 19t-19 45v224q0 26 19 45t45 19h96v32q0 26 19 45t45 19h64q27 0 45.5 -19t18.5 -45v-32h96zM192 352h128v32q0 14 -9 23t-23 9h-64q-13 0 -22.5 -9t-9.5 -23v-32zM96 32v288h-32 q-13 0 -22.5 -9t-9.5 -23v-224q0 -13 9.5 -22.5t22.5 -9.5h32zM384 32v288h-256v-288h256zM480 288q0 14 -9 23t-23 9h-32v-288h32q14 0 23 9.5t9 22.5v224z";

registerIcon(name, transform, d);

export default {name, transform, d};
