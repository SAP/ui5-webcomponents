import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://strikethrough";
const viewBox = "0 0 512 512";
const d = "M224 448H64v32h384v-32H288V288h-64v160zm0-256h64V32h-64v160zm240 64q16 0 16-16t-16-16H48q-16 0-16 16t16 16h416z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
