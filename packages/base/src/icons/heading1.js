import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://heading1";
const transform = "translate(48.5,35)";
const d = "M240 416q16 0 16 -16v-320q0 -16 -16 -16h-8q-16 0 -16 16v144h-176v-144q0 -16 -16 -16h-8q-16 0 -16 16v144v32v144q0 16 16 16h8q16 0 16 -16v-144h176v144q0 16 16 16h8zM448 32h64v-32h-160v32h56v182l-56 -38v37l64 43h32v-224z";

registerIcon(name, transform, d);

export default {name, transform, d};
