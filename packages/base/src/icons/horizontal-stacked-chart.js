import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://horizontal-stacked-chart";
const viewBox = "0 0 512 512";
const d = "M64 64h416V32H32v448h32V64zm64 288H96v64h32v-64zm40 0q-8 0-8 8v48q0 8 8 8h80q8 0 8-8v-48q0-8-8-8h-80zm128 0q-8 0-8 8v48q0 8 8 8h80q8 0 8-8v-48q0-8-8-8h-80zM104 224q-8 0-8 8v48q0 8 8 8h80q8 0 8-8v-48q0-8-8-8h-80zm368 64q8 0 8-8v-48q0-8-8-8h-48q-8 0-8 8v48q0 8 8 8h48zm-88-56q0-8-8-8H232q-8 0-8 8v48q0 8 8 8h144q8 0 8-8v-48zM104 96q-8 0-8 8v48q0 8 8 8h48q8 0 8-8v-48q0-8-8-8h-48zm208 64q8 0 8-8v-48q0-8-8-8h-48q-8 0-8 8v48q0 8 8 8h48zm-96 0q8 0 8-8v-48q0-8-8-8h-16q-8 0-8 8v48q0 8 8 8h16z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
