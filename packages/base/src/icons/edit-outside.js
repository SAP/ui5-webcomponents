import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://edit-outside";
const transform = "translate(48.5,35)";
const d = "M443 376q5 -5 5 -11.5t-5 -11.5l-325 -326q-4 -4 -8 -4l-110 -23l22 110q0 3 1 5t3 4l326 325q5 4 11 4q7 0 11 -4zM322 277l-46 45l-223 -223h-1l46 -46zM409 365l-46 44l-64 -64l45 -45zM503 137q9 -10 9 -23t-9 -23l-92 -86q-5 -5 -11 -5t-11 5t-5 11.5t5 11.5l75 68 h-80q-40 0 -68 -28t-28 -68v-16q0 -16 -16 -16t-16 16v16q0 27 10 50t27.5 40.5t41 27.5t49.5 10h80l-75 69q-5 5 -5 11.5t5 11.5t11 5t11 -5z";

registerIcon(name, transform, d);

export default {name, transform, d};
