import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://addresses";
const viewBox = "0 32 512 512";
const d = "M32 288l96 96 96-96V96H32v192zm160-160v147l-64 64-64-64V128h32v96h64v-96h32zm96 160l96 96 96-96V96H288v192zm160-160v147l-64 64-64-64V128h32v96h64v-96h32zm32 261l32-30v-55L384 423 256 304 128 423 0 304v42l128 134 128-128 128 128 64-61v61h32v-91z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
