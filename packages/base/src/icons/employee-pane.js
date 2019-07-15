import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://employee-pane";
const viewBox = "0 0 512 512";
const d = "M352 320q0-40-28-68t-68-28-68 28-28 68 28 68 68 28 68-28 28-68zm-96-64q26 0 45 18.5t19 45.5q0 26-19 45t-45 19-45-19-19-45q0-27 19-45.5t45-18.5zm0-128h96V96h-96v32zm192 352q14 0 23-9t9-23V64q0-14-9-23t-23-9H64q-13 0-22.5 9T32 64v384q0 14 9.5 23t22.5 9h384zM384 96q0 96-96 96h-64q-96 0-96-96V64h256v32zm64 352H64V64h32v32q0 26 7 49.5t22.5 41T165 214t59 10h64q35 0 59.5-10t39.5-27.5 22-41 7-49.5V64h32v384z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
