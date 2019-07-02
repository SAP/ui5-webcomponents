import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://check-availability";
const transform = "translate(48,35)";
const d = "M32 0h192v-32h-192q-14 0 -23 9t-9 23v416q0 13 9 22.5t23 9.5h64v32h32v-32h192v32h32v-32h64q14 0 23 -9.5t9 -22.5v-128h-32v64h-384v-352zM320 384h32v32h-32v-32zM96 384h32v32h-32v-32zM507 -5q12 -11 0 -23q-5 -5 -11 -5t-11 5l-82 82q-30 -22 -67 -22 q-23 0 -43.5 9t-35.5 24t-24 35.5t-9 43.5t9 43.5t24 35.5t35.5 24t43.5 9t43.5 -9t35.5 -24t24 -35.5t9 -43.5q0 -19 -6 -36t-17 -31zM336 64q33 0 56.5 23.5t23.5 56.5t-23.5 56.5t-56.5 23.5t-56.5 -23.5t-23.5 -56.5t23.5 -56.5t56.5 -23.5z";

registerIcon(name, transform, d);

export default {name, transform, d};
