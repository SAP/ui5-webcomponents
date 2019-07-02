import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://pipeline-analysis";
const transform = "translate(80.5,35)";
const d = "M32 416v-96h48q16 0 16 -16q0 -6 -4.5 -11t-11.5 -5h-48v-64h48q16 0 16 -16q0 -6 -4.5 -11t-11.5 -5h-48v-64h48q16 0 16 -16t-16 -16h-48v-64h16h16h16q16 0 16 -16q0 -6 -4.5 -11t-11.5 -5h-16h-16h-16q-14 0 -23 9.5t-9 22.5v384q0 14 9 23t23 9h16h16h16 q16 0 16 -16q0 -6 -4.5 -11t-11.5 -5h-16h-16h-16zM438 416q10 0 8 -10l-92 -368q-2 -6 -8 -6h-116q-7 0 -7 6l-92 368q-2 4 0.5 7t6.5 3h300zM335 96h-94l8 -32h78zM359 192h-142l16 -64h110zM383 288h-190l16 -64h158zM407 384h-238l16 -64h206z";

registerIcon(name, transform, d);

export default {name, transform, d};
