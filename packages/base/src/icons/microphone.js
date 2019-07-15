import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://microphone";
const viewBox = "0 -32 512 512";
const d = "M256 128q-40 0-68 28t-28 68v160q0 40 28 68t68 28 68-28 28-68V224q0-40-28-68t-68-28zm-64 96q0-26 19-45t45-19q27 0 45.5 19t18.5 45v160q0 26-18.5 45T256 448q-26 0-45-19t-19-45V224zm240 64q16 0 16-16t-16-16h-16v-32q0-29-9.5-55t-27-47-41-35T288 67V0h112q16 0 16-16t-16-16H112q-16 0-16 16t16 16h112v67q-27 6-50.5 20t-41 35-27 47-9.5 55v32H80q-16 0-16 16t16 16h48v-64q0-27 10-50t27.5-40.5 41-27.5T256 96q27 0 50 10t40.5 27.5T374 174t10 50v64h48z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
