import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://measuring-point";
const viewBox = "0 -32 512 512";
const d = "M512 480V0q0-13-9.5-22.5T480-32H256q-14 0-23 9.5T224 0v369q1 28-5 50-5 19-18.5 34.5T160 469q-4-1 2.5 5t34.5 6q22 0 33.5-15t17-33 7-33l1.5-15v-64h96v-32h-96v-64h96v-32h-96v-64h96V96h-96V0h224v480h32zM91 413q-11 11-22 0-5-5-5-11.5t5-11.5l75-68H16q-16 0-16-16t16-16h128l-75-69q-5-5-5-11.5t5-11.5 11-5 11 5l92 86q9 10 9 23t-9 23z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
