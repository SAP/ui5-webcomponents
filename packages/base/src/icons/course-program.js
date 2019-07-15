import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://course-program";
const viewBox = "0 -32 512 512";
const d = "M32 0h160v-32H33q-14 0-23.5 9T0 0v352l128 128h224q14 0 23-9.5t9-22.5v-64h-32v64H160v-96q0-14-9.5-23t-22.5-9H32V0zm461 272q8-5 13.5-10.5T512 248V52q0-4-1-8-1-3-2.5-6t-4.5-5q-1-1-5-1-5 0-13 2-4 1-6 3v193q0 8-5.5 13.5T461 253l-113 33q-2 1-6 1t-8-2l-53-13 148-50q8-5 13.5-10.5T448 198V3q0-10-7-17t-17-7h-5L243 45q-8 2-13.5 8.5T224 69v199q0 15 15 22l90 27q6 2 8 2t3-.5 2-.5zm-237-27V75l160-62v179z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
