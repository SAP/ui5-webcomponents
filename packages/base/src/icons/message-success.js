import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://message-success";
const viewBox = "0 0 512 512";
const d = "M448 480q13 0 22.5-9t9.5-23V64q0-13-9.5-22.5T448 32H64q-14 0-23 9.5T32 64v384q0 14 9 23t23 9h384zm0-32H64V64h384v384zM244 128l-113 95 33 47 74-56 103 170 41-42z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
