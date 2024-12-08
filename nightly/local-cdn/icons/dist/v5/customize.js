import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "customize";
const pathData = "M26 115q-11 0-18.5-7T0 90t7.5-18.5T26 64h172q11 0 18.5 7.5T224 90t-7.5 18-18.5 7H26zm460 122q11 0 18.5 7t7.5 18-7.5 18.5T486 288H314q-11 0-18.5-7.5T288 262t7.5-18 18.5-7h172zm0 160q11 0 18.5 7t7.5 18-7.5 18.5T486 448H382q-5 27-27 45.5T304 512q-33 0-56.5-23.5T224 432t23.5-56.5T304 352q23 0 42.5 12.5T376 397h110zm-182 64q12 0 20.5-8.5T333 432t-8.5-20.5T304 403t-20.5 8.5T275 432t8.5 20.5T304 461zm64-301q-33 0-56.5-23.5T288 80t23.5-56.5T368 0q29 0 51 18.5T446 64h40q11 0 18.5 7.5T512 90t-7.5 18-18.5 7h-46q-10 20-29.5 32.5T368 160zm0-109q-12 0-20.5 8.5T339 80t8.5 20.5T368 109t20.5-8.5T397 80t-8.5-20.5T368 51zM144 192q33 0 56.5 23.5T224 272t-23.5 56.5T144 352t-56.5-23.5T64 272t23.5-56.5T144 192zm0 109q12 0 20.5-8.5T173 272t-8.5-20.5T144 243t-20.5 8.5T115 272t8.5 20.5T144 301zm-10 96q11 0 18.5 7t7.5 18-7.5 18.5T134 448H26q-11 0-18.5-7.5T0 422t7.5-18 18.5-7h108z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v5/customize";
export { pathData, ltr, accData };