import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://full-stacked-chart";
const transform = "translate(80.5,35)";
const d = "M32 32h416v-32h-416h-32v32v416h32v-416zM96 320h-32v64h32v-64zM136 320q-8 0 -8 8v48q0 8 8 8h80q8 0 8 -8v-48q0 -8 -8 -8h-80zM440 384q8 0 8 -8v-48q0 -8 -8 -8h-176q-8 0 -8 8v48q0 8 8 8h176zM72 192q-8 0 -8 8v48q0 8 8 8h80q8 0 8 -8v-48q0 -8 -8 -8h-80z M440 256q8 0 8 -8v-48q0 -8 -8 -8h-48q-8 0 -8 8v48q0 8 8 8h48zM352 200q0 -8 -8 -8h-144q-8 0 -8 8v48q0 8 8 8h144q8 0 8 -8v-48zM72 64q-8 0 -8 8v48q0 8 8 8h48q8 0 8 -8v-48q0 -8 -8 -8h-48zM440 128q8 0 8 -8v-48q0 -8 -8 -8h-80q-8 0 -8 8v48q0 8 8 8h80zM312 128 q8 0 8 -8v-48q0 -8 -8 -8h-144q-8 0 -8 8v48q0 8 8 8h144z";

registerIcon(name, transform, d);

export default {name, transform, d};
