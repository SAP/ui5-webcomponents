import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://ipad-2";
const viewBox = "0 32 512 512";
const d = "M32 96q-13 0-22.5 9.5T0 128v320q0 14 9.5 23t22.5 9h448q14 0 23-9t9-23V128q0-13-9-22.5T480 96H32zm64 32h352v320H96V128zM56 312q-10 0-17-7t-7-17 7-17 17-7q11 0 17.5 7t6.5 17-6.5 17-17.5 7z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
