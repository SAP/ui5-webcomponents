import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://vertical-grip";
const viewBox = "0 0 512 512";
const d = "M224 480h64v-64h-64v64zm0-128h64v-64h-64v64zm0-128h64v-64h-64v64zm0-128h64V32h-64v64z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
