import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://vertical-waterfall-chart";
const transform = "translate(48.5,35)";
const d = "M0 -32v32h512v-32h-512zM416 208h64v-160h-64v160zM352 320v-112h-64v112h64zM224 480v-160h-64v160h64zM96 480v-432h-64v432h64z";

registerIcon(name, transform, d);

export default {name, transform, d};
