import { registerIcon } from "@ui5/webcomponents-base/dist/SVGIconRegistry.js";

const name = "sap-icon://browse-folder";
const d = "M480 64q11 0 18 5t10 11q4 7 4 16v128h-32v-96q-1-9-5-16-3-6-9.5-11T448 96H224l-32-32H64q-12 0-18.5 5T36 80q-4 7-4 16v320q0 13 5 19t11 9q7 4 16 4h160v32H32q-9 0-16-4-6-3-11-9.5T0 448V64q0-9 4-16 3-6 9.5-11T32 32h186l30 32h232zm32 425l-22 23-82-82q-26 18-56 18-40 0-68-28t-28-68 28-68 68-28 68 28 28 68q0 29-18 55zm-160-73q26 0 45-19t19-45q0-27-19-45.5T352 288t-45 18.5-19 45.5q0 26 19 45t45 19z";

registerIcon(name, d);
