import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://print";
const viewBox = "0 -31 512 512";
const d = "M368 290q-16 0-16 16 0 6 4.5 11t11.5 5h64q7 0 11.5-5t4.5-11q0-16-16-16h-64zm112 96q13 0 22.5-9.5T512 354V194q0-14-9.5-23t-22.5-9h-64V2q0-14-9.5-23T384-30H128q-14 0-23 9T96 2v160H32q-14 0-23 9t-9 23v160q0 13 9 22.5t23 9.5h64v64q0 13 9 22.5t23 9.5h256q13 0 22.5-9.5T416 450v-64h64zm-352 0h256v64H128v-64zm256-224v64H128V2h256v160zm96 192H32V194h64v32q0 13 9 22.5t23 9.5h256q13 0 22.5-9.5T416 226v-32h64v160zM192 98h128V66H192v32zm0 64h128v-32H192v32z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
