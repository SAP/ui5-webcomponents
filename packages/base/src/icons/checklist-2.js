import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://checklist-2";
const transform = "translate(80.5,35)";
const d = "M412 352q15 0 25.5 -11.5t10.5 -26.5v-74q0 -18 -12 -28l-103 -111q-12 -11 -23 0l-21 26q-1 -1 -0.5 13.5t0.5 31.5v46q0 29 -20 49.5t-49 20.5h-28v26q0 15 12 26.5t27 11.5h181zM220 256q15 0 25.5 -11.5t10.5 -26.5v-74q0 -18 -12 -28l-103 -111q-12 -11 -23 0 l-103 111q-6 5 -10.5 12.5t-4.5 15.5v74q0 15 12 26.5t27 11.5h181zM39 288q-1 0 -4 3t-8 7l-12 10q-6 5 -10.5 12.5t-4.5 15.5v74q0 15 12 26.5t27 11.5h181q15 0 25.5 -11.5t10.5 -26.5v-26h-25q-29 0 -50 -20.5t-21 -49.5v-26h-121z";

registerIcon(name, transform, d);

export default {name, transform, d};
