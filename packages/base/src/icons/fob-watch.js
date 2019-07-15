import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://fob-watch";
const viewBox = "0 -32 512 512";
const d = "M430 334q23-29 36.5-65t13.5-77q0-46-17.5-87t-48-71.5-71.5-48T256-32t-87 17.5-71.5 48-48 71.5T32 192q0 42 15 80t40.5 67.5 60.5 49 76 25.5v34h-64v32h192v-32h-64v-34q26-4 50-13t44-23l34 34 46-46zM256 0q40 0 75 15t61 41.5 41 61.5 15 74q0 40-15 75t-41 61-61 41-75 15-75-15-61-41-41-61-15-75q0-39 15-74t41-61.5T181 15t75-15zm112 192q16 0 16-16 0-6-4.5-11t-11.5-5H255q-7 0-11.5 5t-4.5 11v96q0 16 16 16t16-16v-80h97z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
