import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://org-chart";
const viewBox = "0 0 512 512";
const d = "M448 160q14 0 23-9.5t9-22.5V64q0-14-9-23t-23-9H320q-13 0-22.5 9T288 64v64q0 13 9.5 22.5T320 160h64v32q0 14-9 23t-23 9H160q-14 0-23-9t-9-23v-32h64q14 0 23-9.5t9-22.5V64q0-14-9-23t-23-9H64q-13 0-22.5 9T32 64v64q0 13 9.5 22.5T64 160h32v32q0 26 19 45t45 19h80v64h-80q-14 0-23 9t-9 23v96q0 13 9 22.5t23 9.5h192q14 0 23-9.5t9-22.5v-96q0-14-9-23t-23-9h-80v-64h80q26 0 45-19t19-45v-32h32zM64 128V64h128v64H64zm288 224v96H160v-96h192zm96-224H320V64h128v64z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
