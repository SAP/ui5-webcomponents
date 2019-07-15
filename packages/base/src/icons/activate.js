import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://activate";
const viewBox = "0 0 512 512";
const d = "M337 308q12-11 0-23l-56-56L89 37q-5-5-12-5t-11 5L21 82q-5 5-5 11t5 11l192 193 57 56q5 5 11 5t11-5zm-79-57l-22 23L55 93l22-23zm179 197h59l-47-39 20-64-53 40-54-40 21 64-47 39h59l21 58zm59-224l-47-39 20-64-53 40-54-40 21 64-47 39h59l21 58 21-58h59zM127 409l-47 39h60l21 58 21-58h59l-47-39 20-64-53 40-55-40z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
