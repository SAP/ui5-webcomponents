import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://upload";
const viewBox = "0 -32 512 512";
const d = "M480 32q13 0 22.5-9.5T512 0q0-14-9.5-23T480-32H32q-14 0-23 9T0 0q0 13 9 22.5T32 32h448zm-98 337q11-12 0-23-5-5-11.5-5t-11.5 5l-87 87V112q0-16-16-16t-16 16v319l-85-85q-5-5-11-5t-11 5q-12 11 0 23l102 101q9 10 22 10t23-10z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
