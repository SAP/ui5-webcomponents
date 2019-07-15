import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://line-chart";
const viewBox = "0 0 512 512";
const d = "M108 95q-7 0-13 4.5T89 112q0 12 11 18l115 34 110-17 110 52q1 1 7 1 17 0 17-18 0-13-11-16l-120-57-108 18-104-29q-2-3-8-3zm0 51q-6 0-12.5 5T89 164q0 9 9 15l116 78 109-19 109 88q6 2 9 2 18 0 18-17 0-11-9-17l-120-94-109 18-103-69q-5-3-10-3zm0 73q-6 0-12 4.5T90 236q0 9 7 15l113 96h108l110 127q6 6 13 6 8 0 13-6t5-13-4-11L335 310H224l-104-87q-4-4-12-4zM496 64V32H17v448h31V64h448z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
