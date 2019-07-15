import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://text";
const viewBox = "0 0 512 512";
const d = "M224 448H64v32h384v-32H288V32h-64v416z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
