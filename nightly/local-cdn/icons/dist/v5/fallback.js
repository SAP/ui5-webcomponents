import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "fallback";
const pathData = "M422 480H90q-38 0-64-26T0 390V122q0-38 26-64t64-26h115q9 0 18 7l44 44h155q38 0 64 26t26 64v25q0 11-7.5 18.5T486 224t-18-7.5-7-18.5v-25q0-17-11-28t-28-11H256q-9 0-18-7l-44-44H90q-17 0-28 11t-11 28v268q0 17 11 28t28 11h332q17 0 28-11t11-28v-13q0-29-21-50t-50-21H214l34 34q8 8 8 18 0 11-7.5 18.5T230 384q-10 0-18-8l-77-76q-7-7-7-19 0-11 7-18l77-76q8-8 18-8 11 0 18.5 7.5T256 205q0 10-8 18l-32 32h174q25 0 47.5 9.5t39 26 26 39T512 377v13q0 38-26 64t-64 26z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v5/fallback";
export { pathData, ltr, accData };