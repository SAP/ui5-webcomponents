import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://it-system";
const viewBox = "0 0 512 512";
const d = "M320 208q0 16 16 16h64q16 0 16-16t-16-16h-64q-16 0-16 16zm96 176q0-14-9-23t-23-9-23 9-9 23 9 23 23 9 23-9 9-23zm-192 0q13 0 22.5-9t9.5-23V64q0-14-9.5-23T224 32H64q-14 0-23 9t-9 23v288q0 14 9 23t23 9h160zm0-32H64V64h160v288zM112 96q-16 0-16 16t16 16h64q16 0 16-16t-16-16h-64zm48 160q-14 0-23 9t-9 23 9 23 23 9 23-9 9-23-9-23-23-9zm288 224q13 0 22.5-9t9.5-23V160q0-14-9.5-23t-22.5-9H288v32h160v288H288v-32h-32v32q0 14 9 23t23 9h160z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
