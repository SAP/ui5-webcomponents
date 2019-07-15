import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://time-entry-request";
const viewBox = "0 -32 512 512";
const d = "M416 208q0-16-16-16H224v144q0 16 16 16t16-16V224h144q16 0 16-16zM256 480q53 0 99.5-20t81.5-55 55-81.5 20-99.5q0-49-17.5-92.5T447 54 376-2t-88-28V2q40 6 75.5 25.5t61 49T465 144t15 80q0 46-17.5 87t-48 71.5-71.5 48-87 17.5q-38 0-72.5-12T121 402.5t-49-51T41 288H8q11 41 34.5 76.5t56 61 72.5 40 85 14.5zM144 0q16 0 16-16 0-6-4.5-11T144-32H16q-6 0-11 5T0-16Q0-9 5-4.5T16 0h128zm0 64q16 0 16-16 0-6-4.5-11T144 32H16q-6 0-11 5T0 48q0 7 5 11.5T16 64h128zm0 64q16 0 16-16 0-6-4.5-11T144 96H16q-6 0-11 5t-5 11q0 7 5 11.5t11 4.5h128z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
