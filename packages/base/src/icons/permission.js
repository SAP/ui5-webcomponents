import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://permission";
const viewBox = "0 -32 512 512";
const d = "M477 233q11 0 18-7.5t7-18.5V105q0-11-7-19t-18-8H330q-11 0-19 8t-8 19v102q0 11 8 18.5t19 7.5h7v42q0 6 3 18.5t11.5 25T375 341t40 10q26 0 41.5-11t23-24 9.5-25 2-13h-34q0 4-2.5 10.5t-7.5 13-13 11-19 4.5q-12 0-20-4.5t-13-11-7.5-13.5-2.5-13v-42h105zm-65-76q16 5 16 23 0 11-7.5 18t-17.5 7q-11 0-18.5-7t-7.5-18q0-8 5-14t12-9l-17-50h51zM394 48V0q0-14-9-23t-23-9H42q-14 0-23 9T10 0v352l128 128h224q13 0 22.5-9t9.5-23v-48h-32v48H170v-96q0-14-9.5-23t-23.5-9H42V0h320v48h32z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
