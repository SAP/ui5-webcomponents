import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://provision";
const transform = "translate(48.5,35)";
const d = "M384 480q14 0 23 -9t9 -23v-128h-128v-32h-32v32h-96v-96h32v-32h-32v-128h-128q-13 0 -22.5 9.5t-9.5 22.5v352q0 14 9.5 23t22.5 9h352zM128 192h-96v-96h96v96zM128 320h-96v-96h96v96zM128 448h-96v-96h96v96zM256 448h-96v-96h96v96zM384 448h-96v-96h96v96z M463 107q-6 -24 -17 -40l34 -36l-33 -32l-34 35q-20 -14 -42 -18v-48h-45v48q-23 4 -39 18l-36 -35l-31 32l34 36q-13 18 -17 40h-49v45h49q2 20 17 40l-34 35l31 33l36 -35q18 11 39 17v49h45v-49q21 -6 42 -17l34 35l33 -33l-34 -35l9.5 -19t7.5 -21h49v-45h-49zM350 48 q34 0 57 24t23 58t-23 56t-57 22t-57 -22t-23 -56t23 -58t57 -24z";

registerIcon(name, transform, d);

export default {name, transform, d};
