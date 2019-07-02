import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://strikethrough";
const transform = "translate(80.5,35)";
const d = "M192 416h-160v32h384v-32h-160v-160h-64v160zM192 160h64v-160h-64v160zM432 224q16 0 16 -16t-16 -16h-416q-16 0 -16 16t16 16h416z";

registerIcon(name, transform, d);

export default {name, transform, d};
