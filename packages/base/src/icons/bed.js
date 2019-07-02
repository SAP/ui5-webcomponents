import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://bed";
const transform = "translate(44.5,35)";
const d = "M510 255v-255h-30v62h-448v-62h-31v320h31v-226h448v161h30zM113 142q-18 0 -29.5 12.5t-11.5 28.5q0 18 11.5 29.5t29.5 11.5q17 0 28 -11.5t11 -29.5q0 -16 -11 -28.5t-28 -12.5zM374 196q15 0 28 -3t24 -12t16.5 -22t4.5 -30h-282l5.5 7t9 16.5t5.5 19t2 24.5h187z ";

registerIcon(name, transform, d);

export default {name, transform, d};
