import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://scatter-chart";
const transform = "translate(64.5,35)";
const d = "M32 32h448v-32h-479v448h31v-416zM128 384h-33v32h33v32h32v-32h32v-32h-32v-32h-32v32zM352 351v32h-32v32h32v32h32v-32h32v-32h-32v-32h-32zM416 192v-32h32v-32h-32v-32h-32v32h-32v32h32v32h32zM480 256v-31h-190v-162h-36v162h-62v-33h32v-32h-32v-32h-32v32h-32 v32h32v33h-96v31h190v191h36v-191h126v32h-32v32h32v32h32v-32h32v-32h-32v-32h32z";

registerIcon(name, transform, d);

export default {name, transform, d};
