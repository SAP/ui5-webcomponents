import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://attachment-zip-file";
const viewBox = "0 -32 512 512";
const d = "M329 383v-31h-34v31h34zm31 0h-31v33h31v-33zm-31 64v-31h-34v31h34zm31-127h-31v32h31v-32zM255 162q0 8 3 21t7 25l33 81v31h31v-31h30l36-99 6-28q0-30-22-52t-52-22-51 22-21 52zm98 26q-11 12-24 12-15 0-27.5-12.5T289 160q0-13 11.5-24.5T325 124q15 0 27.5 12.5T365 164q0 13-12 24zm7 259h-31v33h31v-33zm80 33h-32v-31h32V0H72v321h95q14 0 23.5 9t9.5 22v97h64v31h-96L40 352V0q0-13 9.5-22.5T72-32h368q14 0 23 9.5T472 0v448q0 14-9 23t-23 9z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
