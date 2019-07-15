import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://ppt-attachment";
const viewBox = "0 -32 512 512";
const d = "M352 48h32V0q0-14-9-23t-23-9H32q-14 0-23 9T0 0v352l128 128h224q13 0 22.5-9t9.5-23v-64h-32v64H160v-96q0-14-9.5-23t-23.5-9H32V0h320v48zm128 240q13 0 22.5-9.5T512 256V128q0-14-9.5-23T480 96H320q-14 0-23 9t-9 23v32h-32q-14 0-23 9t-9 23v128q0 13 9 22.5t23 9.5h160q13 0 22.5-9.5T448 320v-32h32zm-192-32q0 13 9 22.5t23 9.5h96v32H256V192h32v64zm192 0H320V128h160v128z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
