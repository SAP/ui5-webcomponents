import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://contacts";
const viewBox = "0 -32 512 512";
const d = "M512 352q0-14-9-23t-23-9v-32q14 0 23-9t9-23v-64q0-14-9-23t-23-9v-32q14 0 23-9t9-23V32q0-14-9-23t-23-9q0-14-9-23t-23-9H64q-13 0-22.5 9T32 0v64H0v32h32v32H0v32h32v128H0v32h32v32H0v32h32v64q0 14 9.5 23t22.5 9h384q14 0 23-9t9-23q14 0 23-9t9-23v-64zM448 32v416H64v-64h32v-32H64v-32h32v-32H64V160h32v-32H64V96h32V64H64V0h384v32zM160 384h224v-64H160v64z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
