import { registerIcon } from "@ui5/webcomponents-base/dist/SVGIconRegistry.js";

const name = "responsive";
const pathData = "M480 224q13 0 22.5 9t9.5 23v192q0 14-9.5 23t-22.5 9h-96q-14 0-23-9t-9-23V256q0-14 9-23t23-9h96zm0 224V256h-96v192h96zm-240 0q6 0 11 4.5t5 11.5q0 6-5 11t-11 5h-96q-7 0-11.5-5t-4.5-11q0-16 16-16h96zM160 64v192h128v32H160q-14 0-23-9t-9-23V64q0-14 9-23t23-9h256q13 0 22.5 9t9.5 23v128h-32V64H160zm-64 64v32H32v224h288v32H32q-14 0-23-9.5T0 384V160q0-14 9-23t23-9h64z";


registerIcon(name, { pathData });
