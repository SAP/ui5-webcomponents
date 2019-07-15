import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://fax-machine";
const viewBox = "0 -32 512 512";
const d = "M32 32q-14 0-23 9T0 64v320q0 14 9 23t23 9h64q14 0 23-9t9-23V64q0-14-9-23t-23-9H32zm448 256q14 0 23-9t9-23V0q0-14-9-23t-23-9H32q-14 0-23 9T0 0h480v256H160v32h320zM224 160q-14 0-23 9t-9 23 9 23 23 9 23-9 9-23-9-23-23-9zm96 0q-14 0-23 9t-9 23 9 23 23 9 23-9 9-23-9-23-23-9zm96 0q-14 0-23 9t-9 23 9 23 23 9 23-9 9-23-9-23-23-9zm0-96q-14 0-23 9t-9 23 9 23 23 9 23-9 9-23-9-23-23-9zm-96 0q-14 0-23 9t-9 23 9 23 23 9 23-9 9-23-9-23-23-9zm-96 0q-14 0-23 9t-9 23 9 23 23 9 23-9 9-23-9-23-23-9zm0 256h-32v128q0 14 9 23t23 9h160l96-96v-64h-32v32h-63q-14 0-23.5 9t-9.5 23v64H224V320z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
