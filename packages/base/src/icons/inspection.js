import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://inspection";
const transform = "translate(56.5,35)";
const d = "M224 -32h-191q-14 0 -23.5 9t-9.5 23v352l128 128h224q14 0 23 -9.5t9 -22.5v-145h-32v145h-192v-96q0 -14 -9.5 -23t-22.5 -9h-96v-320h192v-32zM507 -5q12 -11 0 -23q-5 -5 -11 -5t-11 5l-82 82q-30 -22 -67 -22q-23 0 -43.5 9t-35.5 24t-24 35.5t-9 43.5t9 43.5 t24 35.5t35.5 24t43.5 9t43.5 -9t35.5 -24t24 -35.5t9 -43.5q0 -19 -6 -36t-17 -31zM336 64q33 0 56.5 23.5t23.5 56.5t-23.5 56.5t-56.5 23.5t-56.5 -23.5t-23.5 -56.5t23.5 -56.5t56.5 -23.5z";

registerIcon(name, transform, d);

export default {name, transform, d};
