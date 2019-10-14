import { registerIcon } from "@ui5/webcomponents-base/dist/SVGIconRegistry.js";

const name = "sap-icon://excel-attachment";
const d = "M512 160v224H192V160h320zm-32 32h-64v63h64v-63zm-96 63v-63h-63v63h63zm-63 32v65h63v-65h-63zm-97-95v63h65v-63h-65zm0 160h65v-65h-65v65zm256 0v-65h-64v65h64zm-96 64v64q0 14-9 23t-23 9H32q-14 0-23-9t-9-23V128L128 0h224q13 0 22.5 9t9.5 23v96h-32V32H160v96q0 14-9.5 23t-23.5 9H32v320h320v-64h32z";

registerIcon(name, d);
