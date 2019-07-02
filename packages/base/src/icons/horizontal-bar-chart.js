import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://horizontal-bar-chart";
const transform = "translate(80.5,35)";
const d = "M72 192q-8 0 -8 8v48q0 8 8 8h240q8 0 8 -8v-48q0 -8 -8 -8h-240zM72 320q-8 0 -8 8v48q0 8 8 8h176q8 0 8 -8v-48q0 -8 -8 -8h-176zM440 128q8 0 8 -8v-48q0 -8 -8 -8h-368q-8 0 -8 8v48q0 8 8 8h368zM0 448h32v-448h-32v448z";

registerIcon(name, transform, d);

export default {name, transform, d};
