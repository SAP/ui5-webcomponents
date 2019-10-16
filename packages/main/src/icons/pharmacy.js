import { registerIcon } from "@ui5/webcomponents-base/dist/SVGIconRegistry.js";

const name = "sap-icon://pharmacy";
const d = "M288 288h64v64h-64v64h-64v-64h-64v-64h64v-64h64v64zm64-160q40 0 68 28t28 68v256q0 14-9 23t-23 9H96q-14 0-23-9t-9-23V224q0-40 28-68t68-28V96h-32q-14 0-23-9t-9-23V32q0-14 9-23t23-9h256q14 0 23 9t9 23v32q0 14-9 23t-23 9h-32v32zM160 64h224V32H128v32h32zm256 160q0-26-19-45t-45-19h-32V96H192v64h-32q-26 0-45 19t-19 45v256h320V224z";

registerIcon(name, d);
