import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://heading2";
const viewBox = "0 0 512 512";
const d = "M240 448q6 0 11-4.5t5-11.5V112q0-7-5-11.5T240 96h-8q-16 0-16 16v144H40V112q0-16-16-16h-8Q0 96 0 112v320q0 16 16 16h8q16 0 16-16V288h176v144q0 16 16 16h8zm252-285q-5-5-11.5-13T464 133l-63-69 111-1V32H352v32l90 90q14 14 20 23 8 8 11 18 4 8 4 20t-6 21-16 15q-9 5-25 5-20 0-34-8-13-9-27-29l-28 19q9 14 19 25 13 11 28 18 9 3 19 5t22 2q26 0 44-9 18-8 29-26 10-17 10-38 0-14-5-27-5-12-15-25z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
