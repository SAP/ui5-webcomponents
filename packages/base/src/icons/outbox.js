import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://outbox";
const viewBox = "0 -32 512 512";
const d = "M382 369q11-12 0-23-12-11-23 0l-87 87V207q0-16-16-16t-16 16v224l-85-85q-5-5-11-5t-11 5q-12 11 0 23l102 101q9 10 22 10t23-10zm98-209h-96q0-32-31-32H160q-32 0-32 32H32q-14 0-23-9.5T0 128V0q0-14 9-23t23-9h448q13 0 22.5 9T512 0v128q0 13-9.5 22.5T480 160zm0-160H32v128h71q17-32 57-32h193q39 0 56 32h71V0zM336 64H176q-7 0-11.5-5T160 48q0-16 16-16h160q6 0 11 4.5t5 11.5q0 6-5 11t-11 5z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
