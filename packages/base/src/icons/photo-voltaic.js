import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://photo-voltaic";
const viewBox = "0 -32 512 512";
const d = "M480 254L225 0q0-14 9-23t23-9h223q13 0 22.5 9T512 0v222q0 14-9.5 23t-22.5 9zm0-254H270l210 209V0zm-37 309q-5 5-11 5t-11-5L171 58q-5-5-5-11t5-11 11-5 11 5l250 250q12 11 0 23zM152 428q-2 0-4 .5t-4 .5-4-.5-4-.5v52h16v-52zm63-33q-5 6-11 11l36 37 12-11zm73-67h-52q1 2 1 8 0 5-1 8h52v-16zm-84-63q6 5 11 11l37-37-12-11zm-60-22h8v-51h-16v51h8zm-107-4l36 37q3-3 5.5-6t6.5-5l-37-37zm14 97q0-2 .5-4t.5-4H0v16h52q0-2-.5-4t-.5-4zm34 70q-4-2-6.5-5t-5.5-6l-36 37 11 11zm59-150q-33 0-56.5 23T64 336q0 33 23.5 56.5T144 416t56.5-23.5T224 336q0-34-23.5-57T144 256zm0 128q-20 0-34-14t-14-34 14-34 34-14 34 14 14 34-14 34-34 14z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
