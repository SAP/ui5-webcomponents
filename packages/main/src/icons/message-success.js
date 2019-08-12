import { registerIcon } from "@ui5/webcomponents-base/dist/SVGIconRegistry.js";
import { ICON_MESSAGE_SUCCESS } from "../../dist/generated/i18n/i18n-defaults.js";

const name = "sap-icon://message-success";
const d = "M448 32q13 0 22.5 9t9.5 23v384q0 13-9.5 22.5T448 480H64q-14 0-23-9.5T32 448V64q0-14 9-23t23-9h384zm0 32H64v384h384V64zM244 384l-113-95 33-47 74 56 103-170 41 42z";
const acc = ICON_MESSAGE_SUCCESS;

registerIcon(name, d, acc);
