import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://Chart-Tree-Map";
const transform = "translate(80.5,35)";
const d = "M184 448q8 0 8 -8v-432q0 -8 -8 -8h-176q-8 0 -8 8v432q0 8 8 8h176zM440 448q8 0 8 -8v-176q0 -8 -8 -8h-208q-8 0 -8 8v176q0 8 8 8h208zM440 224q8 0 8 -8v-80q0 -8 -8 -8h-80q-8 0 -8 8v80q0 8 8 8h80zM440 96q8 0 8 -8v-80q0 -8 -8 -8h-80q-8 0 -8 8v80q0 8 8 8h80z M312 224q8 0 8 -8v-208q0 -8 -8 -8h-80q-8 0 -8 8v208q0 8 8 8h80z";

registerIcon(name, transform, d);

export default {name, transform, d};
