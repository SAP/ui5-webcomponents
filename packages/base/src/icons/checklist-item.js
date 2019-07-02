import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://checklist-item";
const transform = "translate(80.5,35)";
const d = "M384 448q27 0 45.5 -19t18.5 -45v-131q0 -29 -22 -48l-181 -197q-8 -8 -21 -8q-12 0 -20 8l-181 197q-23 20 -23 48v131q0 26 19 45t45 19h320zM416 384q0 13 -9 22.5t-23 9.5h-320q-13 0 -22.5 -9.5t-9.5 -22.5v-131q0 -14 12 -24l1 -1l1 -2l178 -194l179 194l1 2l1 1 q11 9 11 24v131z";

registerIcon(name, transform, d);

export default {name, transform, d};
