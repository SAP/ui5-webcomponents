import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://horizontal-bullet-chart";
const transform = "translate(80.5,35)";
const d = "M72 192q-8 0 -8 8v48q0 8 8 8h240q8 0 8 -8v-48q0 -8 -8 -8h-240zM0 448h31v-448h-31v448zM287 288h-31v128h31v-128zM72 320q-8 0 -8 8v48q0 8 8 8h143q8 0 8 -8v-48q0 -8 -8 -8h-143zM416 160h32v-128h-32v128zM353 288h31v-128h-31v128zM376 128q8 0 8 -8v-48 q0 -8 -8 -8h-304q-8 0 -8 8v48q0 8 8 8h304z";

registerIcon(name, transform, d);

export default {name, transform, d};
