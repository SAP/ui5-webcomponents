import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://sys-cancel";
const viewBox = "0 -32 512 512";
const d = "M256 480q53 0 100-20t81.5-55 54.5-81.5 20-99.5-20-99.5T437.5 43 356-12 256-32t-99.5 20T75 43t-55 81.5T0 224t20 99.5T75 405t81.5 55 99.5 20zm0-480q46 0 87 17.5t71.5 48 48 71T480 224q0 46-17.5 87t-48 71.5-71.5 48-87 17.5-87-17.5-71.5-48-48-71.5T32 224q0-47 17.5-87.5t48-71 71.5-48T256 0zm128 323l-98-95 98-99-28-28-101 99-99-99-28 29 97 97-93 94 27 29 96-94 100 96z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
