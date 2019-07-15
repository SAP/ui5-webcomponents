import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://newspaper";
const viewBox = "0 0 512 512";
const d = "M448 480h32V64q0-14-9.5-23T448 32H64q-14 0-23 9t-9 23v384q0 13 9 22.5t22 9.5h320q14 0 23.5-9.5T416 448V160l-96-96h128v416zM256 160q0 13 9.5 22.5T288 192h96v256H63l1-384h192v96zM104 352q-8 0-8 8v48q0 8 8 8h48q8 0 8-8v-48q0-8-8-8h-48zm240 64q8 0 8-8v-48q0-8-8-8H200q-8 0-8 8v48q0 8 8 8h144zm-9-159q16 0 16-16 0-6-4.5-11t-11.5-5H111q-6 0-11 5t-5 11q0 7 5 11.5t11 4.5h224zm-127-66q16 0 16-16 0-6-4.5-11t-11.5-5h-96q-6 0-11 5t-5 11q0 7 5 11.5t11 4.5h96zm0-63q16 0 16-16 0-6-4.5-11T208 96h-96q-6 0-11 5t-5 11q0 7 5 11.5t11 4.5h96zm127 192q16 0 16-16 0-6-4.5-11t-11.5-5H111q-6 0-11 5t-5 11q0 7 5 11.5t11 4.5h224z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
