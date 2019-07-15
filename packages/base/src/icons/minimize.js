import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://minimize";
const viewBox = "0 -32 512 512";
const d = "M480 32q14 0 23-9.5T512 0q0-14-9-23t-23-9H32q-14 0-23 9T0 0q0 13 9 22.5T32 32h448z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
