import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://text-color";
const viewBox = "0 0 512 512";
const d = "M159 160h-51l116 320h64l115-320h-49l-34 96H192zm42 128h109l-54 160zM432 96q7 0 11.5-5t4.5-11V48q0-16-16-16H80q-6 0-11 4.5T64 48v32q0 6 5 11t11 5h352z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
