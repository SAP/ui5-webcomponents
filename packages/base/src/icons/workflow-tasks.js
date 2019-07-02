import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://workflow-tasks";
const transform = "translate(80.5,35)";
const d = "M416 448q14 0 23 -9.5t9 -22.5v-416q0 -14 -9 -23t-23 -9h-384q-14 0 -23 9t-9 23v416q0 13 9 22.5t23 9.5h64v32h32v-32h192v32h32v-32h64zM320 384h32v32h-32v-32zM96 384h32v32h-32v-32zM416 352h-384v-352h384v352zM341 200q9 -10 9 -23t-9 -23l-92 -86q-5 -5 -11 -5 t-11 5t-5 11.5t5 11.5l75 69h-191q-16 0 -16 16t16 16h191l-75 68q-5 5 -5 11.5t5 11.5q11 11 22 0z";

registerIcon(name, transform, d);

export default {name, transform, d};
