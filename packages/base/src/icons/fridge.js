import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://fridge";
const transform = "translate(139.5,35)";
const d = "M320 0h-32v-32h-64v32h-127v-32h-65v32h-32v443q0 15 10.5 26t25.5 11h248q15 0 25.5 -11t10.5 -26v-443zM288 430q0 8 -5.5 13t-12.5 5h-220q-7 0 -12.5 -5t-5.5 -13v-398h256v398zM96 384h129v-32h-129v32zM182 274h73v-18h-73v18z";

registerIcon(name, transform, d);

export default {name, transform, d};
