import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://horizontal-grip";
const viewBox = "0 192 512 512";
const d = "M32 416v64h64v-64H32zm128 0v64h64v-64h-64zm128 0v64h64v-64h-64zm128 0v64h64v-64h-64z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
