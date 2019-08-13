import { registerIcon } from "@ui5/webcomponents-base/dist/SVGIconRegistry.js";
import { ICON_MESSAGE_INFORMATION } from "./generated/i18n/i18n-defaults.js";

const name = "sap-icon://message-information";
const d = "M448 32q13 0 22.5 9t9.5 22v384q0 14-9.5 23.5T448 480H64q-14 0-23-9.5T32 447V63q0-13 9-22t23-9h384zm0 31H64v384h384V63zM320 416H192v-33h33V255h-32v-31h95v159h32v33zm-64-225q-14 0-23-9t-9-22q0-14 9-23.5t23-9.5q13 0 22.5 9.5T288 160q0 13-9.5 22t-22.5 9z";
const acc = ICON_MESSAGE_INFORMATION;

registerIcon(name, d, acc);
