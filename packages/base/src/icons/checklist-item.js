import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://checklist-item";
const viewBox = "0 0 512 512";
const d = "M416 480q27 0 45.5-19t18.5-45V285q0-29-22-48L277 40q-8-8-21-8-12 0-20 8L55 237q-23 20-23 48v131q0 26 19 45t45 19h320zm32-64q0 13-9 22.5t-23 9.5H96q-13 0-22.5-9.5T64 416V285q0-14 12-24l1-1 1-2L256 64l179 194 1 2 1 1q11 9 11 24v131z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
