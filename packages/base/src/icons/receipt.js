import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://receipt";
const viewBox = "0 -33 512 512";
const d = "M411 75l69-55v-47l-74 59-111-55-34 51-68-50-72 54-89-59v43l90 59 71-51 76 55 38-55zM96 101H64v352q0 14 9 23.5t23 9.5h320q14 0 23-9.5t9-23.5V101h-32v352H96V101zm143 289q16 0 16-16 0-6-4.5-11t-11.5-5h-95q-6 0-11 5t-5 11q0 7 5 11.5t11 4.5h95zm0-64q16 0 16-16 0-6-4.5-11t-11.5-5h-95q-6 0-11 5t-5 11q0 7 5 11.5t11 4.5h95zm129 0q16 0 16-16 0-6-4.5-11t-11.5-5h-32q-6 0-11 5t-5 11q0 7 5 11.5t11 4.5h32zm0-64q16 0 16-16 0-6-4.5-11t-11.5-5h-32q-6 0-11 5t-5 11q0 7 5 11.5t11 4.5h32zm0-64q16 0 16-16 0-6-4.5-11t-11.5-5h-32q-6 0-11 5t-5 11q0 7 5 11.5t11 4.5h32z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
