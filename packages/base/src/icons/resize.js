import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://resize";
const d = "M480 0q14 0 23 9.5t9 23.5v143q0 16-16 18-6-1-11-5.5t-5-11.5V57L60 475l-5 5h121q14 0 16 14 0 16-16 18H32q-14 0-23-9.5T0 479V338q0-16 16-18 6 1 11 5.5t5 11.5v120q1-2 4-5L459 32H336q-14 0-16-14 0-16 16-18h144zm-32 288h32v160q0 13-9 22.5t-23 9.5H288v-32h160V288zM64 224H32V64q0-14 9.5-23T64 32h160v32H64v160z";

registerIcon(name, d);
