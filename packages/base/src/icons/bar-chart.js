import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://bar-chart";
const viewBox = "0 0 512 512";
const d = "M88 160q8 0 8-8V40q0-8-8-8H40q-8 0-8 8v112q0 8 8 8h48zm128 192q8 0 8-8V40q0-8-8-8h-48q-8 0-8 8v304q0 8 8 8h48zm128-64q8 0 8-8V40q0-8-8-8h-48q-8 0-8 8v240q0 8 8 8h48zm128 192q8 0 8-8V40q0-8-8-8h-48q-8 0-8 8v432q0 8 8 8h48z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
