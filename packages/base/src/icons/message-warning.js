import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://message-warning";
const viewBox = "0 0 512.2 512.2";
const d = "M256.6 368q13 0 23.5-8t10.5-25l-9-84-2-37q-2-21-24-21-8 0-15.5 5t-7.5 16q-2 38-3.5 61.5t-3 36.5-2.5 18l-1 5q0 17 10.5 25t23.5 8zm0-206q14 0 23-9t9-23-9-23-23-9-23 9-9 23 9 23 23 9zm245-23q9-19 11-37v-6q0-31-23-47.5t-50-16.5h-366q-13 0-26 4.5T24.1 49t-17 20.5T.6 97q-1 11 3 21t9 21l185 335q23 39 61 39 37 0 59-39zm-65-75q43 0 43 32 0 10-8 28l-180 334q-6 12-15.5 17.5t-18.5 5.5-18-5.5-15-17.5l-182-334q-7-13-7-28 0-32 42-32h359z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
