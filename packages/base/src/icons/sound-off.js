import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://sound-off";
const viewBox = "0 -32 512 512";
const d = "M245 302l-23 24q1 0 2 1l140 82q8 7 20 7t22-9 10-23V132l-32 32v220l-2-1-2-2zm51-186l83-83q-4 1-7.5 2t-7.5 4l-140 82q-5 4-16 5.5t-16 1.5h-64q-13 0-19 5t-9 11q-4 7-4 16v128q0 3 1 7 1 3 2 6.5t4 7.5l25-25V160h64l18-2q8-2 16-3.5t15-6.5zM512-9l-23-23L0 457l23 23z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
