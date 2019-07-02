import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://video";
const transform = "translate(48.5,35)";
const d = "M480 416q13 0 22.5 -9t9.5 -23v-320q0 -14 -9.5 -23t-22.5 -9q-9 0 -16 4l-112 120v-28q0 -27 -19 -45.5t-45 -18.5h-224q-26 0 -45 18.5t-19 45.5v192q0 26 19 45t45 19h224q26 0 45 -19t19 -45v-29l112 120q8 5 16 5zM320 320q0 13 -9 22.5t-23 9.5h-224 q-14 0 -23 -9.5t-9 -22.5v-192q0 -14 9 -23t23 -9h224q14 0 23 9t9 23v54v42v41v55zM480 384l-128 -134v-53l128 -133v320z";

registerIcon(name, transform, d);

export default {name, transform, d};
