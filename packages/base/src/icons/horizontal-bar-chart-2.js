import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://horizontal-bar-chart-2";
const transform = "translate(80.5,35)";
const d = "M72 352q-8 0 -8 8v48q0 8 8 8h48q8 0 8 -8v-48q0 -8 -8 -8h-48zM72 256q-8 0 -8 8v48q0 8 8 8h240q8 0 8 -8v-48q0 -8 -8 -8h-240zM72 128q-8 0 -8 8v48q0 8 8 8h176q8 0 8 -8v-48q0 -8 -8 -8h-176zM440 96q8 0 8 -8v-48q0 -8 -8 -8h-368q-8 0 -8 8v48q0 8 8 8h368z M0 448h32v-448h-32v448z";

registerIcon(name, transform, d);

export default {name, transform, d};
