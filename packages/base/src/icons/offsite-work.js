import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://offsite-work";
const transform = "translate(48.5,35)";
const d = "M64 384h64v-64h-64v64zM160 384h64v-64h-64v64zM160 288h64v-64h-64v64zM64 288h64v-64h-64v64zM64 192h64v-64h-64v64zM64 96h64v-64h-64v64zM160 192h64v-64h-64v64zM268 448q20 -8 20 -30v-418v-32h-288v450q0 22 20 30l108 32h32zM256 418l-96 32h-32l-96 -31v-419 h128v96h64v-96h32v64v354zM411 283q-5 5 -11 5t-11 -5t-5 -11.5t5 -11.5l75 -68h-128q-16 0 -16 -16t16 -16h128l-75 -69q-5 -5 -5 -11.5t5 -11.5t11 -5t11 5l92 86q9 10 9 23t-9 23z";

registerIcon(name, transform, d);

export default {name, transform, d};
