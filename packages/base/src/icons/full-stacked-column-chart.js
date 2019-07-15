import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://full-stacked-column-chart";
const viewBox = "0 0 512 512";
const d = "M64 64h416V32H32v448h32V64zm128 32h-64v32h64V96zm-56 64q-8 0-8 8v80q0 8 8 8h48q8 0 8-8v-80q0-8-8-8h-48zm0 128q-8 0-8 8v176q0 8 8 8h48q8 0 8-8V296q0-8-8-8h-48zM264 96q-8 0-8 8v80q0 8 8 8h48q8 0 8-8v-80q0-8-8-8h-48zm0 320q-8 0-8 8v48q0 8 8 8h48q8 0 8-8v-48q0-8-8-8h-48zm0-192q-8 0-8 8v144q0 8 8 8h48q8 0 8-8V232q0-8-8-8h-48zM392 96q-8 0-8 8v48q0 8 8 8h48q8 0 8-8v-48q0-8-8-8h-48zm0 288q-8 0-8 8v80q0 8 8 8h48q8 0 8-8v-80q0-8-8-8h-48zm0-192q-8 0-8 8v144q0 8 8 8h48q8 0 8-8V200q0-8-8-8h-48z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
