import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://horizontal-grip";
const transform = "translate(80.5,35)";
const d = "M0 192v64h64v-64h-64zM128 192v64h64v-64h-64zM256 192v64h64v-64h-64zM384 192v64h64v-64h-64z";

registerIcon(name, transform, d);

export default {name, transform, d};
