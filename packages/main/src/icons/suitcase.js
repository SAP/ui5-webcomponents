import { registerIcon } from "@ui5/webcomponents-base/dist/SVGIconRegistry.js";

const name = "sap-icon://suitcase";
const d = "M448 128q27 0 45.5 19t18.5 45v224q0 26-18.5 45T448 480H64q-26 0-45-19T0 416V192q0-26 19-45t45-19h96V96q0-26 19-45t45-19h64q27 0 45.5 19T352 96v32h96zm-256 0h128V96q0-14-9-23t-23-9h-64q-13 0-22.5 9T192 96v32zM96 448V160H64q-13 0-22.5 9T32 192v224q0 13 9.5 22.5T64 448h32zm288 0V160H128v288h256zm96-256q0-14-9-23t-23-9h-32v288h32q14 0 23-9.5t9-22.5V192z";

registerIcon(name, d);
