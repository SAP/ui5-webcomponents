import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://attachment";
const viewBox = "0 -4 512 512";
const d = "M483 452q29-32 29-70 0-40-29-69L234 64q-40-40-97-40-28 0-53 11T40.5 64.5 11 108 0 161q0 57 40 97l222 221 27-27L68 230q-15-15-22-32.5T39 162q0-19 7-37t20-31.5 31-22 40-8.5q40 0 69 29l250 249q17 17 17 41 0 23-18 41t-41 18q-25 0-42-17L165 216q-6-6-6-13 0-9 6-14.5t14-5.5 14 6l179 179 28-27-180-180q-17-17-42-17-23 0-40.5 17.5T120 202q0 25 17 42l208 208q28 28 68 28 18 0 36.5-7t33.5-21z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
