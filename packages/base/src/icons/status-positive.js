import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://status-positive";
const viewBox = "0 0 512 512";
const d = "M399 480q35 0 58-24t23-56V111q0-33-23-56t-58-23H111q-33 0-56 23t-23 56v289q0 16 6 30.5T55 456t25 17.5 31 6.5h288zm17-74q0 4-3 7.5t-10 3.5H107q-5 0-8-3.5t-3-7.5V107q0-11 11-11h296q3 0 8 1.5t5 9.5v299z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
