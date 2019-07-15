import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://personnel-view";
const viewBox = "0 -32 512 512";
const d = "M224 160q26 0 49.5-10t41-27.5 27.5-41T352 32v-64H32v64q0 26 10 49.5t27.5 41 41 27.5 49.5 10h64zm96-128q0 40-28 68t-68 28h-64q-40 0-68-28T64 32V0h256v32zm-32 224q0-40-28-68t-68-28-68 28-28 68 28 68 68 28 68-28 28-68zm-96-64q26 0 45 19t19 45-19 45-45 19-45-19-19-45 19-45 45-19zm256 256q14 0 23-9t9-23V64q0-14-9-23t-23-9h-64v32h64v352H128v-32H96v32q0 14 9 23t23 9h320z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
