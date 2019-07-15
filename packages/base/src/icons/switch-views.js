import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://switch-views";
const viewBox = "0 -32 512 512";
const d = "M384 352q13 0 22.5-9.5T416 320V0q0-14-9.5-23T384-32H160q-14 0-23 9t-9 23v320q0 13 9 22.5t23 9.5h224zm0-32H160V0h224v320zM32 128h64V96H32q-14 0-23 9t-9 23v320q0 13 9 22.5t23 9.5h224q13 0 22.5-9.5T288 448H32V128zm448 288q13 0 22.5-9.5T512 384V64q0-14-9.5-23T480 32h-32v32h32v320H224q0 13 9 22.5t23 9.5h224z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
