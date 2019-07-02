import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://overflow";
const transform = "translate(48.5,35)";
const d = "M448 128q26 0 45 -19t19 -45t-19 -45t-45 -19t-45 19t-19 45t19 45t45 19zM448 32q14 0 23 9t9 23t-9 23t-23 9t-23 -9t-9 -23t9 -23t23 -9zM256 128q26 0 45 -19t19 -45t-19 -45t-45 -19t-45 19t-19 45t19 45t45 19zM256 32q14 0 23 9t9 23t-9 23t-23 9t-23 -9t-9 -23 t9 -23t23 -9zM64 128q26 0 45 -19t19 -45t-19 -45t-45 -19t-45 19t-19 45t19 45t45 19zM64 32q14 0 23 9t9 23t-9 23t-23 9t-23 -9t-9 -23t9 -23t23 -9z";

registerIcon(name, transform, d);

export default {name, transform, d};
