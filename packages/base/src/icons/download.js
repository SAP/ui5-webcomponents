import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://download";
const viewBox = "0 -32 512 512";
const d = "M480 32q13 0 22.5-9.5T512 0q0-14-9.5-23T480-32H32q-14 0-23 9T0 0q0 13 9 22.5T32 32h448zm-200 74q-10-10-23-10t-22 10L133 207q-12 12 0 23 11 11 22 0l85-85v319q0 16 16 16t16-16V143l87 87q11 11 23 0 11-11 0-23z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
