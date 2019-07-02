import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://email-read";
const transform = "translate(48.5,35)";
const d = "M512 337v-337q0 -13 -9.5 -22.5t-22.5 -9.5h-448q-14 0 -23 9.5t-9 22.5v337l254 143zM464 0l-208 154l-208 -154h416zM328 186l152 135l-225 122l-223 -122l151 -135l-17 -18l-134 121v-273l223 170l225 -168v270l-133 -120z";

registerIcon(name, transform, d);

export default {name, transform, d};
