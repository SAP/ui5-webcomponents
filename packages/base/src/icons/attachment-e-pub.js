import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://attachment-e-pub";
const viewBox = "0 -32 512 512";
const d = "M471 214q5-8 5-14 0-7-5-12L367 84q-5-5-13-5-7 0-12 5L238 188q-5 5-5 12 0 9 5 14l104 102q3 6 12 6 7 0 13-6l65-63-77-78-27 25 53 53-26 25-78-78 78-77 103 103zM388 32h32V0q0-14-9-23t-23-9H68q-14 0-23 9T36 0v352l128 128h224q13 0 22.5-9t9.5-23v-64h-32v64H196v-96q0-14-9.5-23t-23.5-9H68V0h320v32z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
