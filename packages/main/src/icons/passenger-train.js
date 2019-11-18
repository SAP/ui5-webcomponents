import { registerIcon } from "@ui5/webcomponents-base/dist/SVGIconRegistry.js";

const name = "passenger-train";
const pathData = "M128 384q-14 0-23-9.5T96 352V128q0-27 10-50t27.5-40.5T174 10t50-10h64q26 0 49.5 10t41 27.5T406 78t10 50v224q0 13-9 22.5t-23 9.5H128zm0-32h256V128q0-40-28-68t-68-28h-64q-40 0-68 28t-28 68v224zm42 63h170l22 32H149zm213 64l22 33H107l21-33h255zM192 256q14 0 23 9t9 23q0 13-9 22.5t-23 9.5-23-9.5-9-22.5q0-14 9-23t23-9zm128 0q14 0 23 9t9 23q0 13-9 22.5t-23 9.5-23-9.5-9-22.5q0-14 9-23t23-9zM288 64q26 0 45 18.5t19 45.5v96H160v-96q0-27 19-45.5T224 64h64zm40 64q0-17-11.5-28.5T288 88h-64q-17 0-28.5 11.5T184 128v72h144v-72zm152 384h-37l-63-96h4q14 0 28-7zm-347-96l-64 96H32l69-102q12 6 27 6h5z";


registerIcon(name, { pathData });
