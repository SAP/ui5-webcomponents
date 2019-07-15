import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://add-favorite";
const viewBox = "0 -32 512 512";
const d = "M512 96V64h-96v-96h-32v96h-96v32h96v96h32V96h96zm-171 83l-82-60-31 22q-3 3-8 0L67 33q-4-3-8 0t-2 8l63 170q2 5-3 8L3 307q-4 3-2.5 8t6.5 5h145q5 0 7 5l59 150q2 5 6.5 5t6.5-5l59-150q2-5 6-5h145q5 0 7-5t-2-8l-115-88q-4-4-2-8z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
