import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://notes";
const viewBox = "0 -32 512 512";
const d = "M336 288q16 0 16-16 0-6-4.5-11t-11.5-5H176q-6 0-11 5t-5 11q0 7 5 11.5t11 4.5h160zm0-96q16 0 16-16 0-6-4.5-11t-11.5-5H176q-6 0-11 5t-5 11q0 7 5 11.5t11 4.5h160zm0-96q16 0 16-16 0-6-4.5-11T336 64H176q-6 0-11 5t-5 11q0 7 5 11.5t11 4.5h160zm80 352q14 0 23-9.5t9-22.5V0q0-14-9-23t-23-9H96q-14 0-23 9T64 0v416q0 13 9 22.5t23 9.5h64v32h32v-32h128v32h32v-32h64zm-96-64h32v32h-32v-32zm-160 0h32v32h-32v-32zm256-32H96V0h320v352z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
