import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://opportunity";
const viewBox = "0 -32 512 512";
const d = "M442 192h3q3-3 3-4V0q0-14-9-23t-23-9H32q-14 0-23 9T0 0v320q0 14 9 23t23 9h192v-32H32V108l36 37q-4 8-4 15 0 14 9 23t23 9 23-9 9-23q0-7-4-15l53-53q8 4 15 4l46 102q-14 10-14 26 0 14 9 23t23 9 23-9 9-23q0-12-9-23l39-105h2q9 0 17-5l104 101h1zm-26-47l-68-66q4-10 4-15 0-14-9-23t-23-9-23 9-9 23q0 17 15 27l-39 103q-4-2-8-2-1 0-1.5.5t-1.5.5L208 91q7-4 11.5-11t4.5-16q0-14-9-23t-23-9-23 9-9 23q0 9 5 17l-52 52q-8-5-17-5t-17 5L32 86V0h384v145zm-81 111l26 79-67 49h83l26 79 26-79h83l-68-49 26-79-67 49z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
