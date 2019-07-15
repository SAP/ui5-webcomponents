import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://retail-store-manager";
const viewBox = "0 -31 512 512";
const d = "M452 17q0-8-4.5-14T434-4L115-30q-8 0-14.5 4.5T93-12L62 360l358 30zM212 200h-63v-94h63v94zm84 31h-63V106h63v125zm83 32h-63V106h63v157zM230 457q-25-2-38.5-17T177 402l-36-3q0 19 7.5 36t20.5 29.5 30 19.5 36 7q35 0 60-21t32-55l-34-3q-5 24-22 34.5T230 457z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
