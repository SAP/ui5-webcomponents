import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://machine";
const transform = "translate(48.5,35)";
const d = "M32 176h-32v160l192 128h96v-96l128 -68v-60h-128v-128h-256v64zM32 208h32v-32v-32h192v96v32h32h96v9l-111 59l-17 9v19v64h-55l-169 -113v-111zM448 80q26 0 45 -19t19 -45t-19 -45t-45 -19h-448v32h448q13 0 22.5 9.5t9.5 22.5q0 14 -9.5 23t-22.5 9h-448v32h448z M320 112v96h96v-96h-96z";

registerIcon(name, transform, d);

export default {name, transform, d};
