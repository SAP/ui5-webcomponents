import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://print";
const transform = "translate(48,35)";
const d = "M368 289q-16 0 -16 16q0 6 4.5 11t11.5 5h64q7 0 11.5 -5t4.5 -11q0 -16 -16 -16h-64zM480 385q13 0 22.5 -9.5t9.5 -22.5v-160q0 -14 -9.5 -23t-22.5 -9h-64v-160q0 -14 -9.5 -23t-22.5 -9h-256q-14 0 -23 9t-9 23v160h-32h-32q-14 0 -23 9t-9 23v160q0 13 9 22.5 t23 9.5h64v64q0 13 9 22.5t23 9.5h256q13 0 22.5 -9.5t9.5 -22.5v-64h64zM128 385h256v64h-256v-64zM384 161v32v32h-256v-32v-32v-160h256v160zM480 353h-448v-160h64v32q0 13 9 22.5t23 9.5h256q13 0 22.5 -9.5t9.5 -22.5v-32h64v160zM192 97h128v-32h-128v32zM192 161 h128v-32h-128v32z";

registerIcon(name, transform, d);

export default {name, transform, d};
