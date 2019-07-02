import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://retail-store-manager";
const transform = "translate(108,35)";
const d = "M392 16q0 -8 -4.5 -14t-13.5 -7l-319 -26q-8 0 -14.5 4.5t-7.5 13.5l-31 372l358 30zM152 199h-63v-94h63v94zM236 230h-63v-125h63v125zM319 262h-63v-157h63v157zM170 456q-25 -2 -38.5 -17t-14.5 -38l-36 -3q0 19 7.5 36t20.5 29.5t30 19.5t36 7q35 0 60 -21t32 -55 l-34 -3q-5 24 -22 34.5t-41 10.5z";

registerIcon(name, transform, d);

export default {name, transform, d};
