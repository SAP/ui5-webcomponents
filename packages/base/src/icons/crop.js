import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://crop";
const viewBox = "0 -32 512 512";
const d = "M511.5 407v-36h-74V42h-327v-74h-35v74h-74v36h74v329h327v73h35v-73h74zm-109-36h-292V78h292v293zm-72-257h-183l92 183 48-96 25 41 55-91h-55zm9 165q-11 0-19 8t-8 19q0 12 8 20t19 8q12 0 20-8t8-20q0-11-8-19t-20-8z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
