import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "pdf-reader";
const pathData = "M96 0h32v32H96q-27 0-45.5 19T32 96H0q0-40 28-68T96 0zm320 32h-32V0h32q20 0 37 7.5T483.5 28t21 30.5T512 96h-32q0-26-19-45t-45-19zm80 128q16 0 16 16t-16 16h-85v44h60q16 0 16 16t-16 16h-60v60q0 6-4.5 11t-11.5 5-11.5-5-4.5-11V176q0-16 16-16h101zm-363 67q0 27-19.5 46.5T67 293H32v35q0 6-4.5 11T16 344t-11.5-5T0 328V176q0-16 16-16h51q27 0 46.5 19.5T133 227zm120-67q27 0 46.5 19.5T319 227v50q0 28-19.5 47.5T253 344h-51q-7 0-11.5-5t-4.5-11V176q0-16 16-16h51zM32 261h35q14 0 24-10t10-24q0-15-10-25t-24-10H32v69zm255-34q0-15-10-25t-24-10h-35v120h35q14 0 24-10.5t10-24.5v-50zM0 416h32q0 26 18.5 45T96 480h32v32H96q-40 0-68-28T0 416zm384 64h32q26 0 45-19t19-45h32q0 20-7.5 37.5t-21 30.5-30.5 20.5-37 7.5h-32v-32z";
const ltr = true;
const accData = null;
const collection = "SAP-icons-v4";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v4/pdf-reader";
export { pathData, ltr, accData };