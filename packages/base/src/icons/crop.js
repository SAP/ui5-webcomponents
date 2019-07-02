import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://crop";
const transform = "translate(49.5,35)";
const d = "M511 407v-36h-74v-329h-327v-74h-35v74h-74v36h74v329h327v73h35v-73h74zM402 371h-292v-293h292v293zM330 114h-183l92 183l48 -96l25 41l55 -91h-55zM339 279q-11 0 -19 8t-8 19q0 12 8 20t19 8q12 0 20 -8t8 -20q0 -11 -8 -19t-20 -8z";

registerIcon(name, transform, d);

export default {name, transform, d};
