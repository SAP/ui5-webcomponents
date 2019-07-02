import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://inspect-down";
const transform = "translate(48.5,35)";
const d = "M480 480q14 0 23 -9.5t9 -22.5v-320q0 -14 -9 -23t-23 -9h-320q-13 0 -22.5 9t-9.5 23v320q0 13 9.5 22.5t22.5 9.5h320zM480 448h-320v-320h320v320zM352 32h32v-32q0 -14 -9 -23t-23 -9h-320q-13 0 -22.5 9t-9.5 23v320q0 13 9.5 22.5t22.5 9.5h32v-32h-32v-320h320v32 zM224 224l65 65l-65 63l32 32l65 -64l63 64l32 -32l-65 -63l65 -65l-32 -32l-63 65l-65 -65z";

registerIcon(name, transform, d);

export default {name, transform, d};
