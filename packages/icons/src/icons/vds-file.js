import { registerIcon } from "@ui5/webcomponents-base/dist/SVGIconRegistry.js";

const name = "vds-file";
const pathData = "M352 416h32v64q0 14-9 23t-23 9H32q-14 0-23-9t-9-23V128L128 0h224q13 0 22.5 9t9.5 23v64h-32V32H160v96q0 14-9.5 23t-23.5 9H32v320h320v-64zm6-256q43 0 85.5 23.5T512 255q-26 48-68.5 72T358 352h-1q-43 0-85-24t-68-72q26-48 68.5-72t85.5-24zm-1 160q28-1 60.5-15.5T474 255q-24-35-56.5-49T358 192t-59.5 14.5T242 256q20 29 50.5 46.5T357 320zm1-109q19 0 32 13t13 32q0 18-13 31t-32 13-32-13-13-31q0-19 13-32t32-13z";


registerIcon(name, { pathData });
