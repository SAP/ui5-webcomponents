import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://it-system";
const transform = "translate(80.5,35)";
const d = "M288 176q0 16 16 16h64q16 0 16 -16t-16 -16h-64q-16 0 -16 16zM384 352q0 -14 -9 -23t-23 -9t-23 9t-9 23t9 23t23 9t23 -9t9 -23zM192 352q13 0 22.5 -9t9.5 -23v-288q0 -14 -9.5 -23t-22.5 -9h-160q-14 0 -23 9t-9 23v288q0 14 9 23t23 9h160zM192 320h-160v-288h160 v288zM80 64q-16 0 -16 16t16 16h64q16 0 16 -16t-16 -16h-64zM128 224q-14 0 -23 9t-9 23t9 23t23 9t23 -9t9 -23t-9 -23t-23 -9zM416 448q13 0 22.5 -9t9.5 -23v-288q0 -14 -9.5 -23t-22.5 -9h-160v32h160v288h-160v-32h-32v32q0 14 9 23t23 9h160z";

registerIcon(name, transform, d);

export default {name, transform, d};
