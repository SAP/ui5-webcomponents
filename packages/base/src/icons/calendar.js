import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://calendar";
const transform = "translate(80.5,35)";
const d = "M293 102h-95v37l95 129h38v-129h38v-37h-38v-47h-38v47zM236 139h57v76zM128 206q-16 -10 -37 -10v38q16 0 26.5 9.5t10.5 24.5h38v-216h-38v154zM416 448q14 0 23 -9.5t9 -22.5v-416q0 -14 -9 -23t-23 -9h-384q-14 0 -23 9t-9 23v416q0 13 9 22.5t23 9.5h64v32h32v-32 h192v32h32v-32h64zM320 384h32v32h-32v-32zM96 384h32v32h-32v-32zM416 352h-384v-352h384v352z";

registerIcon(name, transform, d);

export default {name, transform, d};
