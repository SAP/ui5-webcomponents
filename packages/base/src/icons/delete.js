import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://delete";
const transform = "translate(80.5,35)";
const d = "M448 448v-32h-448v32h145q-1 0 7 16t40 16h65q31 0 39 -16l8 -16h144zM402 384h46v-33h-32l-32 -351q0 -32 -32 -32h-256q-32 0 -32 32l-32 351h-32v33h368h34zM384 351h-320l32 -351h256zM169 66l-31 -3l-20 224l31 3zM240 64h-34v225h34v-225zM310 63l-33 3l20 224 l33 -3z";

registerIcon(name, transform, d);

export default {name, transform, d};
