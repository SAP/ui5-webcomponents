import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://measurement-document";
const viewBox = "0 -32 512 512";
const d = "M224 320h32V0q0-13-9.5-22.5T224-32H64q-14 0-23 9.5T32 0v209q-1 22-5 43-3 18-9 37T1 320h37q5-4 9.5-19.5T56 268q4-20 8-44h96v-32H64v-32h96v-32H64V96h96V64H64V0h160v320zm256 128q13 0 22.5-9t9.5-23V64q0-13-9.5-22.5T480 32H288v32h192v288H160v-32h-32v96q0 14 9 23t23 9h32v32h32v-32h192v32h32v-32h32zm-256-32h-32v-32h32v32zm224 0h-32v-32h32v32zM320 224v-96h32v160h32V128h32v96h32V96H288v128h32z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
