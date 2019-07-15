import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://horizontal-bar-chart";
const viewBox = "0 0 512 512";
const d = "M104 224q-8 0-8 8v48q0 8 8 8h240q8 0 8-8v-48q0-8-8-8H104zm0 128q-8 0-8 8v48q0 8 8 8h176q8 0 8-8v-48q0-8-8-8H104zm368-192q8 0 8-8v-48q0-8-8-8H104q-8 0-8 8v48q0 8 8 8h368zM32 480h32V32H32v448z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
