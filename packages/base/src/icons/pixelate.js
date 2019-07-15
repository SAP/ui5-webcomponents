import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://pixelate";
const viewBox = "0 0 512 512";
const d = "M288 160V96h-64v64h64zm160 320q14 0 23-9.5t9-22.5V288h-64v64h-64v-64h-64v64h-64v-64h-64v64H96v-64H32v160q0 13 9 22.5t23 9.5h384zM160 224H96v64h64v-64zm-64 0v-64H32v64h64zm64-64V96H96v64h64zm64 64v-64h-64v64h64zm0 0v64h64v-64h-64zm128 64h64v-64h-64v64zm64-128v64h64v-64h-64zm-128 64h64v-64h-64v64zM32 96h64V32H64q-14 0-23 9t-9 23v32zm128 0h64V32h-64v64zm128 0h64V32h-64v64zm128-64v64h64V64q0-14-9-23t-23-9h-32zm-64 128h64V96h-64v64z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
