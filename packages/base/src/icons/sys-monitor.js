import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://sys-monitor";
const transform = "translate(48.5,35)";
const d = "M480 448q14 0 23 -9t9 -23v-320q0 -13 -9 -22.5t-23 -9.5h-448q-13 0 -22.5 9.5t-9.5 22.5v320q0 14 9.5 23t22.5 9h448zM480 416h-448v-320h448v320zM368 32q16 0 16 -16q0 -6 -4.5 -11t-11.5 -5h-224q-6 0 -11 5t-5 11q0 7 5 11.5t11 4.5h224z";

registerIcon(name, transform, d);

export default {name, transform, d};
