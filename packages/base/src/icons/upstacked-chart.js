import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://upstacked-chart";
const viewBox = "0 0 512 512";
const d = "M136 128q8 0 8-8V40q0-8-8-8H56q-8 0-8 8v80q0 8 8 8h80zm0 96q8 0 8-8v-48q0-8-8-8H56q-8 0-8 8v48q0 8 8 8h80zm0 128q8 0 8-8v-80q0-8-8-8H56q-8 0-8 8v80q0 8 8 8h80zm160 96q8 0 8-8V296q0-8-8-8h-80q-8 0-8 8v144q0 8 8 8h80zm0-192q8 0 8-8v-48q0-8-8-8h-80q-8 0-8 8v48q0 8 8 8h80zm0-96q8 0 8-8V40q0-8-8-8h-80q-8 0-8 8v112q0 8 8 8h80zm160 64q8 0 8-8V40q0-8-8-8h-80q-8 0-8 8v176q0 8 8 8h80zm0 160q8 0 8-8V264q0-8-8-8h-80q-8 0-8 8v112q0 8 8 8h80zm0 96q8 0 8-8v-48q0-8-8-8h-80q-8 0-8 8v48q0 8 8 8h80z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
