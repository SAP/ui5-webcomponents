import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "pdf-attachment";
const pathData = "M99 192H67v-65L195 0h224q13 0 22 9 10 9 10 23v63h-32V32H227v95q0 14-10 23-9 9-23 9H99v33zm397 31q16 0 16 16t-16 16h-85v44h60q16 0 16 16t-16 16h-60v60q0 16-16 16-6 0-11-4.5t-5-11.5V239q0-7 5-11.5t11-4.5h101zm-363 67q0 27-19 46.5T67 356H32v35q0 16-16 16-6 0-11-4.5T0 391V239q0-7 5-11.5t11-4.5h51q28 0 47 19.5t19 47.5zm120-67q28 0 47 19.5t19 47.5v50q0 28-19 47.5T253 407h-51q-6 0-11-4.5t-5-11.5V239q0-7 5-11.5t11-4.5h51zM32 324h35q14 0 24-10t10-24-10-24.5T67 255H32v69zm256-34q0-14-10.5-24.5T253 255h-35v120h35q14 0 24.5-10.5T288 340v-50zm131 153h32v36q0 14-9 23t-23 9H99q-14 0-23-9t-9-23v-33h32v33h320v-36z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v4";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v4/pdf-attachment";
export { pathData, ltr, accData };