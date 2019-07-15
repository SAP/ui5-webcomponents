import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://activities";
const viewBox = "0 0 512 512";
const d = "M480 480q13 0 22.5-9t9.5-23V64q0-13-9.5-22.5T480 32H32q-14 0-23 9.5T0 64v384q0 14 9 23t23 9h448zm0-32H32V64h448v384zM117 260l-53 53 17 19 36-36 71 88 18-17zm0-164l-53 54 17 18 36-36 71 89 18-18zm283 96q16 0 16-16 0-6-4.5-11t-11.5-5H272q-6 0-11 5t-5 11q0 7 5 11.5t11 4.5h128zm0 160q16 0 16-16 0-6-4.5-11t-11.5-5H272q-6 0-11 5t-5 11q0 7 5 11.5t11 4.5h128z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
