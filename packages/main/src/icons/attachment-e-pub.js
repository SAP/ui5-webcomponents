import { registerIcon } from "@ui5/webcomponents-base/dist/SVGIconRegistry.js";

const name = "sap-icon://attachment-e-pub";
const d = "M471 266q5 8 5 14 0 7-5 12L367 396q-5 5-13 5-7 0-12-5L238 292q-5-5-5-12 0-9 5-14l104-102q3-6 12-6 7 0 13 6l65 63-77 78-27-25 53-53-26-25-78 78 78 77 103-103zm-83 182h32v32q0 14-9 23t-23 9H68q-14 0-23-9t-9-23V128L164 0h224q13 0 22.5 9t9.5 23v64h-32V32H196v96q0 14-9.5 23t-23.5 9H68v320h320v-32z";

registerIcon(name, d);
