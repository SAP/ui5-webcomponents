import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://suitcase";
const viewBox = "0 0 512 512";
const d = "M448 384q27 0 45.5-19t18.5-45V96q0-26-18.5-45T448 32H64q-26 0-45 19T0 96v224q0 26 19 45t45 19h96v32q0 26 19 45t45 19h64q27 0 45.5-19t18.5-45v-32h96zm-256 0h128v32q0 14-9 23t-23 9h-64q-13 0-22.5-9t-9.5-23v-32zM96 64v288H64q-13 0-22.5-9T32 320V96q0-13 9.5-22.5T64 64h32zm288 0v288H128V64h256zm96 256q0 14-9 23t-23 9h-32V64h32q14 0 23 9.5t9 22.5v224z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
