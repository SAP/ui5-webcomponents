import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://building";
const viewBox = "0 -32 512 512";
const d = "M193 320h128v-32H193v32zm0-64h128v-32H193v32zm0-64h128v-32H193v32zm0-160h128v-64h-32V0h-64v-32h-32v64zm318 82V-32H369v480H145V-32H2v220l109 72v220h291V188zm-37-36h-72V42h72v36zm-281 50h128V96H193v32zm-82-50H39V42h72v36zm0 73H39v-37h72v37zm82 233h128v-32H193v32z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
