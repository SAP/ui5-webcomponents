import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://provision";
const viewBox = "0 -32 512 512";
const d = "M384 480q14 0 23-9t9-23V320H288v-32h-32v32h-96v-96h32v-32h-32V64H32q-13 0-22.5 9.5T0 96v352q0 14 9.5 23t22.5 9h352zM128 192H32V96h96v96zm0 128H32v-96h96v96zm0 128H32v-96h96v96zm128 0h-96v-96h96v96zm128 0h-96v-96h96v96zm79-341q-6-24-17-40l34-36-33-32-34 35q-20-14-42-18v-48h-45v48q-23 4-39 18L251-1l-31 32 34 36q-13 18-17 40h-49v45h49q2 20 17 40l-34 35 31 33 36-35q18 11 39 17v49h45v-49q21-6 42-17l34 35 33-33-34-35 9.5-19 7.5-21h49v-45h-49zM350 48q34 0 57 24t23 58-23 56-57 22-57-22-23-56 23-58 57-24z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
