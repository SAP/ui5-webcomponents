import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://repost";
const viewBox = "0 0 513.5 513.5";
const d = "M416 160h32V64q0-13-9-22.5T416 32H96q-13 0-22.5 9.5T64 64v144l-36-44q-5-5-11.5-5T5 164t-5 11 5 11l51 61q10 9 23 9t23-9l54-61q11-11 0-22-12-11-23 0l-37 44V64h320v96zm92 187q11-11 0-22l-54-60q-10-9-23-9t-23 9l-51 60q-5 5-5 11t5 11q11 11 23 0l36-43v144H96v-96H64v96q0 14 9.5 23t22.5 9h320q14 0 23-9t9-23V304l37 43q11 11 23 0z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
