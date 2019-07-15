import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://create-entry-time";
const viewBox = "0 -32 512 512";
const d = "M159 63v64H95v32h64v64h32v-64h64v-32h-64V63h-32zm193 65h32V0q0-14-9-23t-23-9H32q-14 0-23 9T0 0v352l128 128h224q13 0 22.5-9t9.5-23H160v-96q0-14-9.5-23t-23.5-9H32V0h320v128zm80 128q16 0 16 16t-16 16h-33v48q0 16-16 16t-16-16v-80h65zm-48-96q27 0 50 10t40.5 27.5 27.5 41 10 49.5q0 27-10 50t-27.5 40.5T434 406t-50 10-50-10-40.5-27.5T266 338t-10-50q0-26 10-49.5t27.5-41T334 170t50-10zm0 224q40 0 68-28t28-68-28-68-68-28-68 28-28 68 28 68 68 28z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
