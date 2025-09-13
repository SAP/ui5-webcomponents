import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "washing-machine";
const pathData = "M384 159q-13 0-22.5-9.5T352 127q0-14 9.5-23t22.5-9q14 0 23 9t9 23q0 13-9 22.5t-23 9.5zm64-127q14 0 23 8.5t9 22.5v384q0 13-9 23t-23 10H64q-13 0-22.5-10T32 447V63q0-14 9.5-22.5T64 32h384zm0 31H64v384h384V63zM256 415q-26 0-49.5-10t-41-27.5T138 337t-10-50 10-50 27.5-40.5 41-27.5 49.5-10q27 0 50.5 10t40.5 27.5 27 40.5 10 50-10 50-27 40.5-40.5 27.5-50.5 10zm0-224q-40 0-68 28t-28 68 28 68 68 28 68-28 28-68q0-41-27.5-68.5T256 191z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v4";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v4/washing-machine";
export { pathData, ltr, accData };