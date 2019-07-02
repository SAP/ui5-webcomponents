import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://switch-views";
const transform = "translate(48.5,35)";
const d = "M384 352q13 0 22.5 -9.5t9.5 -22.5v-320q0 -14 -9.5 -23t-22.5 -9h-224q-14 0 -23 9t-9 23v320q0 13 9 22.5t23 9.5h224zM384 320h-224v-320h224v320zM32 128h64v-32h-64q-14 0 -23 9t-9 23v320q0 13 9 22.5t23 9.5h224q13 0 22.5 -9.5t9.5 -22.5h-32h-192h-32v-320z M480 416q13 0 22.5 -9.5t9.5 -22.5v-320q0 -14 -9.5 -23t-22.5 -9h-32v32h32v320h-32h-192h-32q0 13 9 22.5t23 9.5h224z";

registerIcon(name, transform, d);

export default {name, transform, d};
