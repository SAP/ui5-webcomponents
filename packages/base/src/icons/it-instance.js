import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://it-instance";
const transform = "translate(176.5,35)";
const d = "M224 480q14 0 23 -9t9 -23v-448q0 -14 -9 -23t-23 -9h-192q-13 0 -22.5 9t-9.5 23v448q0 14 9.5 23t22.5 9h192zM224 448h-192v-448h192v448zM80 64q-16 0 -16 16t16 16h96q16 0 16 -16t-16 -16h-96zM160 352q-14 0 -23 9t-9 23t9 23t23 9t23 -9t9 -23t-9 -23t-23 -9z ";

registerIcon(name, transform, d);

export default {name, transform, d};
