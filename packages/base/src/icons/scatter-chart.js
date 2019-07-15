import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://scatter-chart";
const viewBox = "0 0 512 512";
const d = "M48 64h448V32H17v448h31V64zm96 352h-33v32h33v32h32v-32h32v-32h-32v-32h-32v32zm224-33v32h-32v32h32v32h32v-32h32v-32h-32v-32h-32zm64-159v-32h32v-32h-32v-32h-32v32h-32v32h32v32h32zm64 64v-31H306V95h-36v162h-62v-33h32v-32h-32v-32h-32v32h-32v32h32v33H80v31h190v191h36V288h126v32h-32v32h32v32h32v-32h32v-32h-32v-32h32z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
