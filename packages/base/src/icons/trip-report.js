import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://trip-report";
const viewBox = "0 0 512 512";
const d = "M448 384q27 0 45.5-19t18.5-45V96q0-26-18.5-45T448 32H64q-26 0-45 19T0 96v224q0 26 19 45t45 19h96v32q0 26 19 45t45 19h64q27 0 45.5-19t18.5-45v-32h96zm-256 0h128v32q0 14-9 23t-23 9h-64q-13 0-22.5-9t-9.5-23v-32zm288-64q0 14-9 23t-23 9H64q-13 0-22.5-9T32 320V96q0-14 9.5-23T64 64h384q14 0 23 9t9 23v224zM234 191l60-71q-8-5-17-8t-19-4q-21-2-39.5 3.5T185 129t-25 29.5-12 37.5q-4 38 17.5 68t57.5 39zm27 36l-5 95q28 1 52-10.5t40-31.5zm96 21q7-15 9-33 2-27-8-50.5T330 124l-55 71z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
