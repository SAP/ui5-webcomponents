import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://line-chart-dual-axis";
const viewBox = "0 0 512 512";
const d = "M480 481V32H32v449h32V64h384v417h32zm-98-257q1 1 7 1 7 0 12.5-4.5T407 207q0-11-11-16l-108-58-87 18-68-51q-2-3-8-3-7 0-13 4.5t-6 12.5q0 12 11 18l80 59 87-19zm-257-53q-6 0-12.5 5t-6.5 13q0 9 9 15l80 78 87-19 96 86q7 4 12 4 6 0 11.5-6t5.5-13q0-9-8-15l-108-95-89 19-67-69q-5-3-10-3zm0 73q-6 0-12 4.5t-6 12.5q0 9 7 15l78 96h85l97 102q6 7 15 7 8 0 13-5.5t5-12.5q0-6-4-11L295 335h-89l-69-87q-4-4-12-4z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
