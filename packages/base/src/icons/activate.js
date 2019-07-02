import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://activate";
const transform = "translate(64.5,35)";
const d = "M321 276q12 -11 0 -23l-56 -56l-192 -192q-5 -5 -12 -5t-11 5l-45 45q-5 5 -5 11t5 11l192 193l57 56q5 5 11 5t11 -5zM242 219l-22 23l-181 -181l22 -23zM421 416h59l-47 -39l20 -64l-53 40l-54 -40l21 64l-47 39h59l21 58zM480 192l-47 -39l20 -64l-53 40l-54 -40 l21 64l-47 39h59l21 58l21 -58h59zM111 377l-47 39h60l21 58l21 -58h59l-47 -39l20 -64l-53 40l-55 -40z";

registerIcon(name, transform, d);

export default {name, transform, d};
