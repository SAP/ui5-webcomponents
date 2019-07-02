import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://vertical-bar-chart";
const transform = "translate(80.5,35)";
const d = "M200 64q-8 0 -8 8v240q0 8 8 8h48q8 0 8 -8v-240q0 -8 -8 -8h-48zM72 64q-8 0 -8 8v176q0 8 8 8h48q8 0 8 -8v-176q0 -8 -8 -8h-48zM328 64q-8 0 -8 8v368q0 8 8 8h48q8 0 8 -8v-368q0 -8 -8 -8h-48zM0 32h448v-32h-448v32z";

registerIcon(name, transform, d);

export default {name, transform, d};
