import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://workflow-tasks";
const viewBox = "0 -32 512 512";
const d = "M448 448q14 0 23-9.5t9-22.5V0q0-14-9-23t-23-9H64q-14 0-23 9T32 0v416q0 13 9 22.5t23 9.5h64v32h32v-32h192v32h32v-32h64zm-96-64h32v32h-32v-32zm-224 0h32v32h-32v-32zm320-32H64V0h384v352zm-75-152q9-10 9-23t-9-23l-92-86q-5-5-11-5t-11 5-5 11.5 5 11.5l75 69H143q-16 0-16 16t16 16h191l-75 68q-5 5-5 11.5t5 11.5q11 11 22 0z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
