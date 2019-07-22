import { registerIcon } from "../SVGIconRegistry.js";

const name = "sap-icon://trip-report";
const d = "M448 128q27 0 45.5 19t18.5 45v224q0 26-18.5 45T448 480H64q-26 0-45-19T0 416V192q0-26 19-45t45-19h96V96q0-26 19-45t45-19h64q27 0 45.5 19T352 96v32h96zm-256 0h128V96q0-14-9-23t-23-9h-64q-13 0-22.5 9T192 96v32zm288 64q0-14-9-23t-23-9H64q-13 0-22.5 9T32 192v224q0 14 9.5 23t22.5 9h384q14 0 23-9t9-23V192zM234 321l60 71q-8 5-17 8t-19 4q-21 2-39.5-3.5T185 383t-25-29.5-12-37.5q-4-38 17.5-68t57.5-39zm27-36l-5-95q28-1 52 10.5t40 31.5zm96-21q7 15 9 33 2 27-8 50.5T330 388l-55-71z";

registerIcon(name, d);
