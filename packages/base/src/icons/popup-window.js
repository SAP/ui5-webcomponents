import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://popup-window";
const viewBox = "0 -32 512 512";
const d = "M480 480q14 0 23-9.5t9-22.5V160q0-14-9-23t-23-9H160q-13 0-22.5 9t-9.5 23v288q0 13 9.5 22.5T160 480h320zm0-32H160V160h320v288zM368 0q16 0 16-16 0-6-4.5-11T368-32H144q-6 0-11 5t-5 11q0 7 5 11.5T144 0h224zm112 96h32V64q0-13-9-22.5T480 32H32q-13 0-22.5 9.5T0 64v320q0 14 9.5 23t22.5 9h64v-32H32V64h448v32z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
