import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://ipad";
const viewBox = "0 -32 512 512";
const d = "M416 480q14 0 23-9.5t9-22.5V0q0-14-9-23t-23-9H96q-14 0-23 9T64 0v448q0 13 9 22.5t23 9.5h320zM256 0q10 0 17 6.5t7 17.5q0 10-7 17t-17 7-17-7-7-17q0-11 7-17.5T256 0zm160 416H96V64h320v352z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
