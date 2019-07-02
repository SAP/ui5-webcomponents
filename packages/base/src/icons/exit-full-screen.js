import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://exit-full-screen";
const transform = "translate(48,35)";
const d = "M160 160q14 0 23 -9.5t9 -23.5v-141q0 -16 -16 -18q-6 1 -11 5.5t-5 11.5v118l-131 -130q-12 -10 -24 -1q-10 14 0 24l134 132h-123q-14 0 -16 14q0 16 16 18h144zM496 320q14 0 16 -14q0 -16 -16 -18h-144q-14 0 -23 9.5t-9 23.5v141q0 16 16 18q6 -1 11 -5.5t5 -11.5 v-118l132 131q12 10 24 1q10 -14 0 -24l-135 -133h123zM448 224h32v-192q0 -13 -9 -22.5t-23 -9.5h-192v32h192v192zM64 224h-32v192q0 14 9.5 23t22.5 9h192v-32h-192v-192z";

registerIcon(name, transform, d);

export default {name, transform, d};
