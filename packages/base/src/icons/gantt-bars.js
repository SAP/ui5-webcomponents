import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://gantt-bars";
const viewBox = "0 -32 512 512";
const d = "M448 64h32V0q0-14-9-23t-23-9H64q-13 0-22.5 9T32 0v192h32V0h384v64zM64 288H32v128q0 13 9.5 22.5T64 448h64v32h32v-32h192v32h32v-32h64q14 0 23-9.5t9-22.5V160h-32v192H64v-64zm288 96h32v32h-32v-32zm-224 0h32v32h-32v-32zm64-160H0v32h288q7 0 11.5-5t4.5-11q0-4-10-16.5T272 197q-14-17-31-36zm320-96V96h-96l-47-64-49 64h-64l-47-65q-19 20-33 37-12 14-22 27t-10 17q0 6 4.5 11t11.5 5h352z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
