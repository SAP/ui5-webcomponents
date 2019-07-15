import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://color-fill";
const viewBox = "0 0 512 512";
const d = "M448 480q14 0 23-9.5t9-22.5V64q0-14-9-23t-23-9H64q-13 0-22.5 9T32 64v384q0 13 9.5 22.5T64 480h384z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
