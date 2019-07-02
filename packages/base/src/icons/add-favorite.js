import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://add-favorite";
const transform = "translate(48.54545593261719,35)";
const d = "M512 96v-32h-96v-96h-32v96h-96v32h96v96h32v-96h96zM341 179l-82 -60l-31 22q-3 3 -8 0l-153 -108q-4 -3 -8 0t-2 8l63 170q2 5 -3 8l-114 88q-4 3 -2.5 8t6.5 5h145q5 0 7 5l59 150q2 5 6.5 5t6.5 -5l59 -150q2 -5 6 -5h145q5 0 7 -5t-2 -8l-115 -88q-4 -4 -2 -8z";

registerIcon(name, transform, d);

export default {name, transform, d};
