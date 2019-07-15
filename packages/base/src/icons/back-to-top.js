import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://back-to-top";
const viewBox = "0 -32 512 512";
const d = "M480 480q14 0 23-9.5t9-22.5q0-14-9-23t-23-9H32q-14 0-23 9t-9 23q0 13 9 22.5t23 9.5h448zm-98-239q11-12 0-23-12-11-23 0l-87 87V-16q0-16-16-16t-16 16v319l-85-85q-5-5-11-5t-11 5q-12 11 0 23l102 101q9 10 22 10t23-10z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
