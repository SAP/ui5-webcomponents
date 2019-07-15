import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://attachment-html";
const viewBox = "0 -32 512 512";
const d = "M242 297q7-6 7-15 0-6-3-10l-64-80 64-81q2-6 2-11 0-6-3.5-12T231 82q-7 0-14 7l-82 103 82 102q4 7 14 7 6 0 11-4zm100 9q5 14 18 14 8 0 12.5-6t4.5-12-1-7L304 76q-4-13-18-13-8 0-13 6t-5 13q0 5 1 6zm61-220q-7 4-7 14 0 7 4 11l64 81-64 80q-4 4-4 11 0 8 5 13t13 5 15-7l82-102-82-103q-7-7-15-7-7 0-11 4zm-50-54h32V0q0-14-9-23t-23-9H33q-14 0-23 9T1 0v352l128 128h224q13 0 22.5-9t9.5-23v-32h-32v32H161v-96q0-14-9.5-23t-23.5-9H33V0h320v32z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
