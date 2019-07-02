import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://bar-chart";
const transform = "translate(80.5,35)";
const d = "M56 128q8 0 8 -8v-112q0 -8 -8 -8h-48q-8 0 -8 8v112q0 8 8 8h48zM184 320q8 0 8 -8v-304q0 -8 -8 -8h-48q-8 0 -8 8v304q0 8 8 8h48zM312 256q8 0 8 -8v-240q0 -8 -8 -8h-48q-8 0 -8 8v240q0 8 8 8h48zM440 448q8 0 8 -8v-432q0 -8 -8 -8h-48q-8 0 -8 8v432q0 8 8 8h48z ";

registerIcon(name, transform, d);

export default {name, transform, d};
