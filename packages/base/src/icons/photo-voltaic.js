import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://photo-voltaic";
const transform = "translate(48.5,35)";
const d = "M480 254l-255 -254q0 -14 9 -23t23 -9h223q13 0 22.5 9t9.5 23v222q0 14 -9.5 23t-22.5 9zM480 0h-210l210 209v-209zM443 309q-5 5 -11 5t-11 -5l-250 -251q-5 -5 -5 -11t5 -11t11 -5t11 5l250 250q12 11 0 23zM152 428q-2 0 -4 0.5t-4 0.5t-4 -0.5t-4 -0.5v52h16v-52z M215 395q-5 6 -11 11l36 37l12 -11zM288 328h-52q1 2 1 8q0 5 -1 8h52v-16zM204 265q6 5 11 11l37 -37l-12 -11zM144 243h8v-51h-16v51h8zM37 239l36 37q3 -3 5.5 -6t6.5 -5l-37 -37zM51 336q0 -2 0.5 -4t0.5 -4h-52v16h52q0 -2 -0.5 -4t-0.5 -4zM85 406q-4 -2 -6.5 -5 t-5.5 -6l-36 37l11 11zM144 256q-33 0 -56.5 23t-23.5 57q0 33 23.5 56.5t56.5 23.5t56.5 -23.5t23.5 -56.5q0 -34 -23.5 -57t-56.5 -23zM144 384q-20 0 -34 -14t-14 -34t14 -34t34 -14t34 14t14 34t-14 34t-34 14z";

registerIcon(name, transform, d);

export default {name, transform, d};
