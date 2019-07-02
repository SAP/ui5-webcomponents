import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://doctor";
const transform = "translate(48.5,35)";
const d = "M288 336q0 -23 -9 -43.5t-24 -35.5t-35.5 -24t-43.5 -9t-43.5 9t-35.5 24t-24 35.5t-9 43.5t9 43.5t24 35.5t35.5 24t43.5 9t43.5 -9t35.5 -24t24 -35.5t9 -43.5zM176 256q34 0 57 23.5t23 56.5t-23 56.5t-57 23.5q-33 0 -56.5 -23.5t-23.5 -56.5t23.5 -56.5t56.5 -23.5z M224 224q27 0 50 -10t40.5 -27.5t27.5 -40.5t10 -50v-128h-352v128q0 27 10 50t27.5 40.5t41 27.5t49.5 10h48h48zM320 96q0 40 -28 68t-68 28h-96q-20 0 -37 -7.5t-30.5 -20.5t-21 -30.5t-7.5 -37.5v-96h288v96zM512 416v-64h-64v-64h-64v64h-64v64h64v64h64v-64h64z M256 96h32v-32h-32v-32h-32v32h-32v32h32v32h32v-32z";

registerIcon(name, transform, d);

export default {name, transform, d};
