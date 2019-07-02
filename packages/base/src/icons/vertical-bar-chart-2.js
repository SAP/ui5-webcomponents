import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://vertical-bar-chart-2";
const transform = "translate(80.5,35)";
const d = "M40 64q-8 0 -8 8v48q0 8 8 8h48q8 0 8 -8v-48q0 -8 -8 -8h-48zM136 64q-8 0 -8 8v240q0 8 8 8h48q8 0 8 -8v-240q0 -8 -8 -8h-48zM264 64q-8 0 -8 8v176q0 8 8 8h48q8 0 8 -8v-176q0 -8 -8 -8h-48zM360 64q-8 0 -8 8v368q0 8 8 8h48q8 0 8 -8v-368q0 -8 -8 -8h-48zM0 32 h448v-32h-448v32z";

registerIcon(name, transform, d);

export default {name, transform, d};
