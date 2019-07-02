import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://add-product";
const transform = "translate(48.5,35)";
const d = "M73 170l109 -53v-47l-109 54v46zM252 -14l-34 -16l-218 110v290l109 55l218 -109v-62q-8 -2 -14.5 -5t-11.5 -5q-6 -4 -11 -6v55l-181 92l-73 -37v-246l182 -91l4 2l4 2q3 1 6 1l8 -14zM190 425l-40 20l68 35l218 -110v-119q-18 6 -36 8v89l-182 91zM416 192h-32v-96h-96 v-32h96v-96h32v96h96v32h-96v96z";

registerIcon(name, transform, d);

export default {name, transform, d};
