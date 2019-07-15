import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://exit-full-screen";
const viewBox = "0 -32.263 513 513";
const d = "M160 166.737q14 0 23-9.5t9-23.5v-141q0-16-16-18-6 1-11 5.5t-5 11.5v118l-131-130q-12-10-24-1-10 14 0 24l134 132H16q-14 0-16 14 0 16 16 18h144zm336 160q14 0 16-14 0-16-16-18H352q-14 0-23 9.5t-9 23.5v141q0 16 16 18 6-1 11-5.5t5-11.5v-118l132 131q12 10 24 1 10-14 0-24l-135-133h123zm-48-96h32v-192q0-13-9-22.5t-23-9.5H256v32h192v192zm-384 0H32v192q0 14 9.5 23t22.5 9h192v-32H64v-192z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
