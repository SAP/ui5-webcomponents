import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://inspect-down";
const viewBox = "0 -32 512 512";
const d = "M480 480q14 0 23-9.5t9-22.5V128q0-14-9-23t-23-9H160q-13 0-22.5 9t-9.5 23v320q0 13 9.5 22.5T160 480h320zm0-32H160V128h320v320zM352 32h32V0q0-14-9-23t-23-9H32q-13 0-22.5 9T0 0v320q0 13 9.5 22.5T32 352h32v-32H32V0h320v32zM224 224l65 65-65 63 32 32 65-64 63 64 32-32-65-63 65-65-32-32-63 65-65-65z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
