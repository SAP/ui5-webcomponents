import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://accelerated";
const viewBox = "0 -32 512 512";
const d = "M240 224q-6 0-11 5t-5 11q0 7 5 11.5t11 4.5h128q16 0 16-16 0-6-4.5-11t-11.5-5H240zm-128-64q-6 0-11 5t-5 11q0 7 5 11.5t11 4.5h160q16 0 16-16 0-6-4.5-11t-11.5-5H112zm16-48q0 7 5 11.5t11 4.5h256q16 0 16-16 0-6-4.5-11T400 96H144q-6 0-11 5t-5 11zm320 336q14 0 23-9.5t9-22.5V0q0-14-9-23t-23-9H64q-14 0-23 9T32 0v416q0 13 9 22.5t23 9.5h64v32h32v-32h192v32h32v-32h64zm-96-64h32v32h-32v-32zm-224 0h32v32h-32v-32zm320-32H64V0h384v352z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
