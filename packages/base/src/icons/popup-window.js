import { registerIcon } from "../SVGIconRegistry.js";

const name = "sap-icon://popup-window";
const d = "M480 0q14 0 23 9.5t9 22.5v288q0 14-9 23t-23 9H160q-13 0-22.5-9t-9.5-23V32q0-13 9.5-22.5T160 0h320zm0 32H160v288h320V32zM368 480q16 0 16 16 0 6-4.5 11t-11.5 5H144q-6 0-11-5t-5-11q0-7 5-11.5t11-4.5h224zm112-96h32v32q0 13-9 22.5t-23 9.5H32q-13 0-22.5-9.5T0 416V96q0-14 9.5-23T32 64h64v32H32v320h448v-32z";

registerIcon(name, d);
