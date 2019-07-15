import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://menu2";
const viewBox = "0 33 512 512";
const d = "M32 416q-13 0-22.5 9.5T0 448q0 14 9.5 23t22.5 9h448q14 0 23-9t9-23q0-13-9-22.5t-23-9.5H32zm0-159q-13 0-22.5 9.5T0 289q0 14 9.5 23t22.5 9h448q14 0 23-9t9-23q0-13-9-22.5t-23-9.5H32zm0-159q-13 0-22.5 9.5T0 130q0 14 9.5 23t22.5 9h448q14 0 23-9t9-23q0-13-9-22.5T480 98H32z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
