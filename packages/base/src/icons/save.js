import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://save";
const viewBox = "0 0 512 512";
const d = "M426 480q22 0 38-15.5t16-38.5V86q0-23-16-38.5T426 32H149q-6 0-13 5L37 137q-5 4-5 12v277q0 23 15.5 38.5T86 480h340zm-266-32V320h192v128H160zM320 64v128H192V64h128zm128 362q0 9-6.5 15.5T426 448h-42V320q0-14-9.5-23t-22.5-9H160q-14 0-23 9t-9 23v128H86q-9 0-15.5-6.5T64 426V155l91-91h5v128q0 14 9 23t23 9h128q13 0 22.5-9t9.5-23V64h74q9 0 15.5 6.5T448 86v340zM248 176q8 0 8-8v-48q0-8-8-8h-17q-7 0-7 8v48q0 8 7 8h17z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
