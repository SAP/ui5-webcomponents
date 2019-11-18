import { registerIcon } from "@ui5/webcomponents-base/dist/SVGIconRegistry.js";

const name = "business-card";
const pathData = "M480 64q14 0 23 9t9 23v320q0 13-9 22.5t-23 9.5H32q-13 0-22.5-9.5T0 416V96q0-14 9.5-23T32 64h448zm0 32H32v320h448V96zM160 288q47 0 71.5 21t24.5 75H64q0-54 24.5-75t71.5-21zm64-64q0 26-19 45t-45 19-45-19-19-45q0-27 19-45.5t45-18.5 45 18.5 19 45.5zm176 0q16 0 16 16 0 6-4.5 11t-11.5 5h-96q-6 0-11-5t-5-11q0-7 5-11.5t11-4.5h96zm0-64q16 0 16 16 0 6-4.5 11t-11.5 5h-96q-6 0-11-5t-5-11q0-7 5-11.5t11-4.5h96z";


registerIcon(name, { pathData });
