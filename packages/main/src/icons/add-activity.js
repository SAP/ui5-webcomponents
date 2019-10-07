import { registerIcon } from "@ui5/webcomponents-base/dist/SVGIconRegistry.js";

const name = "sap-icon://add-activity";
const d = "M416 384h96v32h-96v96h-32v-96h-96v-32h96v-96h32v96zm64-352q13 0 22.5 9.5T512 64v192h-32V64H32v384h192v32H32q-14 0-23-9t-9-23V64q0-13 9-22.5T32 32h448zM206 146l-89 107-53-54 17-18 36 36 71-89zm-89 234l71-88 18 17-89 107-53-53 17-19zm283-220q16 0 16 16 0 6-4.5 11t-11.5 5H272q-6 0-11-5t-5-11q0-7 5-11.5t11-4.5h128z";

registerIcon(name, d);
