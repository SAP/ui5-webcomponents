import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://measure";
const transform = "translate(48.5,35)";
const d = "M512 416v-32h-32v-80q0 -16 -16 -16t-16 16v80h-32v-112q0 -16 -16 -16t-16 16v112h-32v-80q0 -16 -16 -16t-16 16v80h-32v-112q0 -16 -16 -16t-16 16v112h-32v-80q0 -16 -16 -16t-16 16v80h-32v-112q0 -16 -16 -16t-16 16v112h-32v-80q0 -16 -16 -16t-16 16v80h-32v-112 q0 -16 -16 -16t-16 16v144h512zM368 160h144v-32h-128l16 -32h112v-32h-96l10 -21q2 -4 0 -7.5t-7 -3.5h-166q-5 0 -7 3.5t0 7.5l10 21h-256v32h272l16 32h-288v32h304l25 49q2 5 7 5t7 -5zM380 64l-44 88l-44 -88h88z";

registerIcon(name, transform, d);

export default {name, transform, d};
