import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://checklist-2";
const viewBox = "0 -0.5 512 512";
const d = "M444 383.5q15 0 25.5-11.5t10.5-26.5v-74q0-18-12-28l-103-111q-12-11-23 0l-21 26q-1-1-.5 13.5t.5 31.5v46q0 29-20 49.5t-49 20.5h-28v26q0 15 12 26.5t27 11.5h181zm-192-96q15 0 25.5-11.5t10.5-26.5v-74q0-18-12-28l-103-111q-12-11-23 0l-103 111q-6 5-10.5 12.5T32 175.5v74q0 15 12 26.5t27 11.5h181zm-181 32q-1 0-4 3t-8 7l-12 10q-6 5-10.5 12.5T32 367.5v74q0 15 12 26.5t27 11.5h181q15 0 25.5-11.5t10.5-26.5v-26h-25q-29 0-50-20.5t-21-49.5v-26H71z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
