import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://email";
const transform = "translate(48,35)";
const d = "M480 384q14 0 23 -9t9 -23v-320q0 -13 -9 -22.5t-23 -9.5h-448q-13 0 -22.5 9.5t-9.5 22.5v320q0 14 9.5 23t22.5 9h448zM64 352l192 -160l192 160h-384zM480 336l-224 -176l-224 176v-288l133 136l19 -18l-136 -134h416l-135 134l17 18l134 -136v288z";

registerIcon(name, transform, d);

export default {name, transform, d};
