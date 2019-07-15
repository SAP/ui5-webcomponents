import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://offsite-work";
const viewBox = "0 -32 512 512";
const d = "M64 384h64v-64H64v64zm96 0h64v-64h-64v64zm0-96h64v-64h-64v64zm-96 0h64v-64H64v64zm0-96h64v-64H64v64zm0-96h64V32H64v64zm96 96h64v-64h-64v64zm108 256q20-8 20-30V-32H0v450q0 22 20 30l108 32h32zm-12-30l-96 32h-32l-96-31V0h128v96h64V0h32v418zm155-135q-5 5-11 5t-11-5-5-11.5 5-11.5l75-68H336q-16 0-16-16t16-16h128l-75-69q-5-5-5-11.5t5-11.5 11-5 11 5l92 86q9 10 9 23t-9 23z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
