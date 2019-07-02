import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://create-session";
const transform = "translate(64.5,35)";
const d = "M32 32h224v-32h-224q-14 0 -23 9t-9 23v384q0 13 9 22.5t23 9.5h384q13 0 22.5 -9.5t9.5 -22.5v-224h-32v128h-384v-288zM335 -32l26 79l-67 49h83l26 79l26 -79h83l-68 -49l26 -79l-67 49z";

registerIcon(name, transform, d);

export default {name, transform, d};
