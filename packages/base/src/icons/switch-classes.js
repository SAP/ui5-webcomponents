import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://switch-classes";
const viewBox = "0 -32 512 512";
const d = "M192 160q27 0 50-10t40.5-27.5T310 82t10-50v-64H0v64q0 27 10 50t27.5 40.5 41 27.5 49.5 10h64zm96-128q0 40-28 68t-68 28h-64q-20 0-37-7.5T60.5 100t-21-30.5T32 32V0h256v32zm-32 224q0-40-28-68t-68-28-68 28-28 68 28 68 68 28 68-28 28-68zm-96-64q27 0 45.5 19t18.5 45q0 27-18.5 45.5T160 320q-26 0-45-18.5T96 256q0-26 19-45t45-19zm256 224q14 0 23-9t9-23V64q0-13-9-22.5T416 32h-64v32h64v320H192v32h224zm64 64q14 0 23-9t9-23V96h-32v352H256v32h224z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
