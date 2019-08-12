import { registerIcon } from "@ui5/webcomponents-base/dist/SVGIconRegistry.js";

const name = "sap-icon://ppt-attachment";
const d = "M352 432h32v48q0 14-9 23t-23 9H32q-14 0-23-9t-9-23V128L128 0h224q13 0 22.5 9t9.5 23v64h-32V32H160v96q0 14-9.5 23t-23.5 9H32v320h320v-48zm128-240q13 0 22.5 9.5T512 224v128q0 14-9.5 23t-22.5 9H320q-14 0-23-9t-9-23v-32h-32q-14 0-23-9t-9-23V160q0-13 9-22.5t23-9.5h160q13 0 22.5 9.5T448 160v32h32zm-192 32q0-13 9-22.5t23-9.5h96v-32H256v128h32v-64zm192 0H320v128h160V224z";

registerIcon(name, d);
