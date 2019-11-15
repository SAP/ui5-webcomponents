import { registerIcon } from "@ui5/webcomponents-base/dist/SVGIconRegistry.js";

const name = "save";
const pathData = "M426 32q22 0 38 15.5T480 86v340q0 23-16 38.5T426 480H149q-6 0-13-5L37 375q-5-4-5-12V86q0-23 15.5-38.5T86 32h340zM160 64v128h192V64H160zm160 384V320H192v128h128zM448 86q0-9-6.5-15.5T426 64h-42v128q0 14-9.5 23t-22.5 9H160q-14 0-23-9t-9-23V64H86q-9 0-15.5 6.5T64 86v271l91 91h5V320q0-14 9-23t23-9h128q13 0 22.5 9t9.5 23v128h74q9 0 15.5-6.5T448 426V86zM248 336q8 0 8 8v48q0 8-8 8h-17q-7 0-7-8v-48q0-8 7-8h17z";


registerIcon(name, { pathData });
