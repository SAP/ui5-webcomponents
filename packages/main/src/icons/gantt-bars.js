import { registerIcon } from "@ui5/webcomponents-base/dist/SVGIconRegistry.js";

const name = "sap-icon://gantt-bars";
const d = "M448 416h32v64q0 14-9 23t-23 9H64q-13 0-22.5-9T32 480V288h32v192h384v-64zM64 192H32V64q0-13 9.5-22.5T64 32h64V0h32v32h192V0h32v32h64q14 0 23 9.5t9 22.5v256h-32V128H64v64zm288-96h32V64h-32v32zm-224 0h32V64h-32v32zm64 160H0v-32h288q7 0 11.5 5t4.5 11q0 4-10 16.5T272 283q-14 17-31 36zm320 96v32h-96l-47 64-49-64h-64l-47 65q-19-20-33-37-12-14-22-27t-10-17q0-6 4.5-11t11.5-5h352z";

registerIcon(name, d);
