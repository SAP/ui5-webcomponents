import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://retail-store";
const viewBox = "0 0 512 512";
const d = "M429 448l51-96v-32q0-14-9-23t-23-9q-13 0-22.5 9t-9.5 23q0-14-9-23t-23-9q-13 0-22.5 9t-9.5 23q0-14-9-23t-23-9q-13 0-22.5 9t-9.5 23q0-14-9-23t-23-9q-13 0-22.5 9t-9.5 23q0-14-9-23t-23-9q-13 0-22.5 9t-9.5 23q0-14-9-23t-23-9q-13 0-22.5 9T96 320q0-14-9-23t-23-9q-13 0-22.5 9T32 320v32l52 96h35l-42-96h56l22 96h33l-22-96h74v96h32v-96h75l-22 96h33l22-96h56l-43 96h36zm-349 0q-6 0-11 4.5T64 464q0 6 5 11t11 5h352q7 0 11.5-5t4.5-11q0-16-16-16H80zm64-352q-6 0-11 4.5t-5 11.5v96q0 6 5 11t11 5h96q7 0 11.5-5t4.5-11v-96q0-16-16-16h-96zm16 32h64v64h-64v-64zm256 128h32V32h-96v160h-32V32H64v224h32V64h192v144q0 6 5 11t11 5h64q7 0 11.5-5t4.5-11V64h32v192z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
