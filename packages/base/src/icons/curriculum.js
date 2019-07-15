import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://curriculum";
const viewBox = "0 0 512 512";
const d = "M365 354q8-4 13.5-9.5T384 331V167q0-4-1-8-2-8-6-11-2-1-6-1-5 0-13 2-4 1-6 3v160q0 8-2 11.5t-10 8.5l-88 20h-5q-6 0-9-1l-53-14 116-33q8-4 13.5-9.5T320 281V118q0-11-7-17.5T296 94h-5l-144 49q-8 2-13.5 8.5T128 166v167q0 17 15 22l90 27q6 2 9 2t5-1zm-205-44V173l128-45v146zm320 138q11 0 18-5t10-11q4-7 4-16V64q0-12-5-18.5T496 36q-7-4-16-4H32q-9 0-16 4-6 3-11 9.5T0 64v384q0 9 4 16 3 6 9.5 11t18.5 5h187l37-32h224zm0-64q-1 9-5 16-3 6-9.5 11t-17.5 5H224l-32 32H64q-12 0-18.5-5T36 432q-4-7-4-16V96q0-13 5-19t11-9q7-4 16-4h384q9 0 16 4 6 3 11 9t5 19v288z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
