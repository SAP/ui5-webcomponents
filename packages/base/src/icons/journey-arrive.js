import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://journey-arrive";
const viewBox = "0 32 512 512";
const d = "M480 480q14 0 23-9t9-23V128q0-14-9-23t-23-9H160q-14 0-23 9t-9 23v64h32v-64h320v320H160v-64h-32v64q0 14 9 23t23 9h320zM343 312q9-10 9-23t-9-23l-92-86q-5-5-11-5t-11 5-5 11.5 5 11.5l75 69H16q-16 0-16 16t16 16h288l-75 68q-5 5-5 11.5t5 11.5q11 11 22 0z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
