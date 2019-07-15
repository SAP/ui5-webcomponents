import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://appear-offline";
const viewBox = "0 -32 512 512";
const d = "M256 480q53 0 100-20t81.5-54.5T492 324t20-100-20-99.5T437.5 43 356-12 256-32t-99.5 20T75 43t-55 81.5T0 224t20 100 55 81.5 81.5 54.5 99.5 20zm0-426q36 0 67 13.5t54 36.5 36.5 54 13.5 66q0 36-13.5 67T377 345t-54 36.5-67 13.5q-35 0-66-13.5T136 345t-36.5-54T86 224q0-35 13.5-66t36.5-54 54-36.5T256 54z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
