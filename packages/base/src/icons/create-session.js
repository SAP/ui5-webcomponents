import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://create-session";
const viewBox = "0 -32 512 512";
const d = "M32 32h224V0H32Q18 0 9 9T0 32v384q0 13 9 22.5t23 9.5h384q13 0 22.5-9.5T448 416V192h-32v128H32V32zm303-64l26 79-67 49h83l26 79 26-79h83l-68-49 26-79-67 49z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
