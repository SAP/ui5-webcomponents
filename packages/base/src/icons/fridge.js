import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://fridge";
const viewBox = "0 -32 512 512";
const d = "M416 0h-32v-32h-64V0H193v-32h-65V0H96v443q0 15 10.5 26t25.5 11h248q15 0 25.5-11t10.5-26V0zm-32 430q0 8-5.5 13t-12.5 5H146q-7 0-12.5-5t-5.5-13V32h256v398zm-192-46h129v-32H192v32zm86-110h73v-18h-73v18z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
