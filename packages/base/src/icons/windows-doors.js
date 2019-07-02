import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://windows-doors";
const transform = "translate(48.5,35)";
const d = "M0 -32v512h256v-512h-256zM32 448v-448h192v448h-192zM416 480h96v-96v-32v-96h-96h-32h-96v224h96h32zM320 448v-64h64v64h-64zM320 288h64v64h-64v-64zM480 288v64h-64v-64h64zM416 384h64v64h-64v-64zM161 240q0 -16 16 -16t16 16t-16 16t-16 -16z";

registerIcon(name, transform, d);

export default {name, transform, d};
