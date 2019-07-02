import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://crossed-line-chart";
const transform = "translate(49.5,35)";
const d = "M54 128l20 -49l-37 -100q-3 -11 -17 -11q-18 0 -18 18q0 5 1 6zM508 100q1 -1 1 -6q0 -7 -5 -12t-13 -5q-13 0 -17 12l-31 87l19 57zM112 180l-20 53l34 88l39 -76l-18 -47l-17 32zM296 200l21 -50l-58 -175l-68 133l19 48l42 -86zM352 253l-22 50l51 156l39 -109 l-18 -59l-20 57zM495 476q14 -5 14 -18q0 -2 -0.5 -3t-0.5 -2l-124 -411l-127 295l-129 -347l-126 316q-1 1 -1 6q0 18 19 18q11 0 17 -11l90 -228l126 342l126 -286l94 316q5 13 18 13h4z";

registerIcon(name, transform, d);

export default {name, transform, d};
