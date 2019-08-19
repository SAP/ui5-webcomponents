import { registerIcon } from "@ui5/webcomponents-base/dist/SVGIconRegistry.js";

const name = "sap-icon://notification-2";
const d = "M368 128q16 0 16 16 0 6-4.5 11t-11.5 5H144q-6 0-11-5t-5-11q0-7 5-11.5t11-4.5h224zm0 96q16 0 16 16 0 6-4.5 11t-11.5 5H144q-6 0-11-5t-5-11q0-7 5-11.5t11-4.5h224zm80-192q27 0 45.5 19T512 96v224q0 26-18.5 45T448 384h-32v75q0 10-6.5 15.5T395 480q-7 0-12-4l-79-92H64q-26 0-45-19T0 320V96q0-26 19-45t45-19h384zm32 64q0-13-9-22.5T448 64H64q-13 0-22.5 9.5T32 96v224q0 14 9.5 23t22.5 9h256l64 80v-80h64q14 0 23-9t9-23V96z";

registerIcon(name, d);
