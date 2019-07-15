import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://value-help";
const viewBox = "0 0 512 512";
const d = "M448 480q13 0 22.5-9t9.5-23V224q0-13-9.5-22.5T448 192h-96v32h96v224H224v-96h-32v96q0 14 9 23t23 9h224zM288 320q13 0 22.5-9t9.5-23V64q0-13-9.5-22.5T288 32H64q-14 0-23 9.5T32 64v224q0 14 9 23t23 9h224zm0-32H64V64h224v224z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
