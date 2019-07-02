import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://x-ray";
const transform = "translate(49.5,35)";
const d = "M509 480v-19h-52v-17h-17v17h-38v-17h-17v17h-37v-17h-18v17h-37v-17h-18v17h-37v-17h-18v17h-37v-17h-18v17h-37v-17h-17v17h-38v-17h-17v17h-55v19h456h52zM19 425h18v-18h-18v-37h18v-18h-18v-36h18v-19h-18v-36h18v-19h-18v-36h18v-19h-18v-36h18v-19h-18v-36h18v-18 h-18v-37h18v-18h-18v-55h-18v476h18v-19zM509 370l-33 -34h33v-302h-33l33 -34h-68l-33 34h-202l-33 -34h-67l33 34h-33v302h33l-33 34h67l33 -34h202l33 34h68zM476 84v202l-101 -101zM256 303l51 -51l51 51h-102zM139 286v-202l101 101zM358 67l-51 51l-51 -51h102z M459 67l-118 118l118 118h-67l-85 -84l-84 84h-67l118 -118l-118 -118h67l84 84l85 -84h67z";

registerIcon(name, transform, d);

export default {name, transform, d};
