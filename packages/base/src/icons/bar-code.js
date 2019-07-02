import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://bar-code";
const transform = "translate(48.5,35)";
const d = "M73 352h17v-193h-17v193zM73 129h17v-64h-17v64zM110 129h17v-64h-17v64zM164 129h18v-64h-18v64zM201 129h17v-64h-17v64zM237 129h17v-64h-17v64zM291 129h18v-64h-18v64zM328 129h17v-64h-17v64zM382 129h17v-64h-17v64zM419 129h16v-64h-16v64zM164 352h18v-193h-18 v193zM201 352h17v-193h-17v193zM291 352h18v-193h-18v193zM382 266h17v-107h-17v107zM419 266h16v-107h-16v107zM110 352h34v-193h-34v193zM237 352h37v-193h-37v193zM328 266h35v-107h-35v107zM512 321v-249q0 -15 -6 -28q-6 -11 -16 -23q-11 -11 -24 -15q-12 -6 -28 -6 h-365q-16 0 -29 6q-11 5 -23 15q-5 6 -8.5 11.5t-6.5 11.5q-6 13 -6 28v303q0 15 6 29q3 6 6.5 12t8.5 11q10 8 23 15q13 6 29 6h312zM474 288h-86q-15 0 -25.5 10.5t-10.5 25.5v87h-279q-16 0 -25.5 -10t-9.5 -26v-303q0 -15 9.5 -25t25.5 -10h365q16 0 26 10t10 25v37v179 z";

registerIcon(name, transform, d);

export default {name, transform, d};
