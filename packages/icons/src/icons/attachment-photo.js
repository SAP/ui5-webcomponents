import { registerIcon } from "@ui5/webcomponents-base/dist/SVGIconRegistry.js";

const name = "attachment-photo";
const pathData = "M512 99v313H225V99h287zm-32 29H257v224h223V128zm-69 84q0 15-11 25.5T374 248t-26-10.5-11-25.5q0-18 11.5-27t25.5-9 25.5 9 11.5 27zm-96 108v-53q0-19 18-19h86q17 0 17 19v53H315zm37 128h32v32q0 14-9 23t-23 9H32q-14 0-23-9t-9-23V128L128 0h224q13 0 22.5 9t9.5 23v32h-32V32H160v96q0 14-9.5 23t-23.5 9H32v320h320v-32z";


registerIcon(name, { pathData });
