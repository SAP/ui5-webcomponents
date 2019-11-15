import { registerIcon } from "@ui5/webcomponents-base/dist/SVGIconRegistry.js";

const name = "inspect";
const pathData = "M480 0q14 0 23 9.5t9 22.5v320q0 14-9 23t-23 9H160q-14 0-23-9t-9-23V32q0-13 9-22.5T160 0h320zm0 32H160v320h320V32zM352 448h32v32q0 14-9 23t-23 9H32q-14 0-23-9t-9-23V160q0-13 9-22.5t23-9.5h32v32H32v320h320v-32zm32-352H240q-16 2-16 18 1 6 5.5 10.5T240 129h123L230 261q-10 10 0 24 12 9 24-1l131-132v120q0 7 4.5 11.5T400 289q16-2 16-18V128q0-14-9-23t-23-9z";


registerIcon(name, { pathData });
