import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://accidental-leave";
const viewBox = "0 -1 512 512";
const d = "M191 191H96v128h95v96h129v-96h96V191h-96V95H191v96zm33 32v-96h64v96h95v64h-95v96h-64v-96h-96v-64h96zm224 256q14 0 23-8.5t9-22.5V63q0-13-9-23t-23-10H64q-13 0-22.5 10T32 63v385q0 14 9.5 22.5T64 479h384zm-1-32H64V63h383v384z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
