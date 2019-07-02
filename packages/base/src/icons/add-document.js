import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://add-document";
const transform = "translate(64.5,35)";
const d = "M480 96v-32h-96v-96h-32v96h-96v32h96v96h32v-96h96zM32 0h192v-32h-191q-14 0 -23.5 9.5t-9.5 22.5v352l128 128h224q14 0 23 -9t9 -23v-192h-32v192h-192v-96q0 -13 -9.5 -22.5t-22.5 -9.5h-96v-320z";

registerIcon(name, transform, d);

export default {name, transform, d};
