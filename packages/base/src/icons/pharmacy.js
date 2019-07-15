import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://pharmacy";
const viewBox = "0 -32 512 512";
const d = "M288 192h64v-64h-64V64h-64v64h-64v64h64v64h64v-64zm64 160q40 0 68-28t28-68V0q0-14-9-23t-23-9H96q-14 0-23 9T64 0v256q0 40 28 68t68 28v32h-32q-14 0-23 9t-9 23v32q0 14 9 23t23 9h256q14 0 23-9t9-23v-32q0-14-9-23t-23-9h-32v-32zm-192 64h224v32H128v-32h32zm256-160q0 26-19 45t-45 19h-32v64H192v-64h-32q-26 0-45-19t-19-45V0h320v256z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
