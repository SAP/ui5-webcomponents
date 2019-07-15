import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://windows-doors";
const viewBox = "0 -32 512 512";
const d = "M0-32v512h256V-32H0zm32 480V0h192v448H32zm384 32h96V256H288v224h128zm-96-32v-64h64v64h-64zm0-160h64v64h-64v-64zm160 0v64h-64v-64h64zm-64 96h64v64h-64v-64zM161 240q0-16 16-16t16 16-16 16-16-16z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
