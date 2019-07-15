import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://x-ray";
const viewBox = "0 -32 512 512";
const d = "M510.5 480v-19h-52v-17h-17v17h-38v-17h-17v17h-37v-17h-18v17h-37v-17h-18v17h-37v-17h-18v17h-37v-17h-18v17h-37v-17h-17v17h-38v-17h-17v17h-55v19h508zm-490-55h18v-18h-18v-37h18v-18h-18v-36h18v-19h-18v-36h18v-19h-18v-36h18v-19h-18v-36h18v-19h-18V96h18V78h-18V41h18V23h-18v-55h-18v476h18v-19zm490-55l-33-34h33V34h-33l33-34h-68l-33 34h-202l-33-34h-67l33 34h-33v302h33l-33 34h67l33-34h202l33 34h68zm-33-286v202l-101-101zm-220 219l51-51 51 51h-102zm-117-17V84l101 101zm219-219l-51 51-51-51h102zm101 0l-118 118 118 118h-67l-85-84-84 84h-67l118-118-118-118h67l84 84 85-84h67z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
