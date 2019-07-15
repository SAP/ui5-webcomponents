import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://excel-attachment";
const viewBox = "0 -32 512 512";
const d = "M512 320V96H192v224h320zm-32-32h-64v-63h64v63zm-96-63v63h-63v-63h63zm-63-32v-65h63v65h-63zm-97 95v-63h65v63h-65zm0-160h65v65h-65v-65zm256 0v65h-64v-65h64zm-96-64V0q0-14-9-23t-23-9H32q-14 0-23 9T0 0v352l128 128h224q13 0 22.5-9t9.5-23v-96h-32v96H160v-96q0-14-9.5-23t-23.5-9H32V0h320v64h32z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
