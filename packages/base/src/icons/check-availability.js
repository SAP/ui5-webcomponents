import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://check-availability";
const viewBox = "0 -33 513 513";
const d = "M32 6h192v-32H32q-14 0-23 9T0 6v416q0 13 9 22.5t23 9.5h64v32h32v-32h192v32h32v-32h64q14 0 23-9.5t9-22.5V294h-32v64H32V6zm288 384h32v32h-32v-32zm-224 0h32v32H96v-32zM507 1q12-11 0-23-5-5-11-5t-11 5l-82 82q-30-22-67-22-23 0-43.5 9T257 71t-24 35.5-9 43.5 9 43.5 24 35.5 35.5 24 43.5 9 43.5-9 35.5-24 24-35.5 9-43.5q0-19-6-36t-17-31zM336 70q33 0 56.5 23.5T416 150t-23.5 56.5T336 230t-56.5-23.5T256 150t23.5-56.5T336 70z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
