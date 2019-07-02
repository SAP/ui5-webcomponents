import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://documents";
const transform = "translate(80.5,35)";
const d = "M416 384q13 0 22.5 -9t9.5 -23v-352q0 -14 -9 -23t-23 -9h-288q-14 0 -23 9t-9 23v288l96 96h224zM416 352h-192v-64q0 -14 -9.5 -23t-23.5 -9h-63v-256h288v352zM32 64h-32v384q0 14 9.5 23t22.5 9h288v-32h-32h-256v-384zM352 128h-160v32h160v-32zM352 64h-160v32h160 v-32z";

registerIcon(name, transform, d);

export default {name, transform, d};
