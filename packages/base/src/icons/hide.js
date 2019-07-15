import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://hide";
const viewBox = "0 -32 512 512";
const d = "M306 241q14 8 14 22 0 11-7 18t-17 7q-15 0-22-14l-42 42q6 2 12 3t12 1q40 0 68-28t28-68q0-13-3-25zm-25-110q-12-3-25-3-40 0-68 28t-28 68q0 6 1 12t3 12zM23 480L512-10l-22-22L0 457zm233-128q-14 0-27-2t-26-5l-26 26q20 6 39.5 9.5T256 384q36 0 72.5-10t70-30 63-49.5T512 225q-17-32-39-57t-48-45l-23 23q21 16 40 35.5t33 43.5q-37 60-95 93.5T256 352zm-1-256q14 0 27.5 2t26.5 5l26-26q-20-6-39.5-9.5T256 64h-1q-36 0-72 10t-69.5 30T51 154 0 224q34 62 87 101l23-23q-42-30-73-78 38-60 95-94t123-34z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
