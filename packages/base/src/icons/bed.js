import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://bed";
const viewBox = "0 0 512 512";
const d = "M511 287V32h-30v62H33V32H2v320h31V126h448v161h30zM114 174q-18 0-29.5 12.5T73 215q0 18 11.5 29.5T114 256q17 0 28-11.5t11-29.5q0-16-11-28.5T114 174zm261 54q15 0 28-3t24-12 16.5-22 4.5-30H166l5.5 7 9 16.5 5.5 19 2 24.5h187z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
