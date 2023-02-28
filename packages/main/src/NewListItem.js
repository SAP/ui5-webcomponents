import StandardListItem from "./StandardListItem.js";

const metadata = {
	tag: "ui5-new-list-item",
	properties: {
		newName: {
			type: String,
		},
	},
};

class NewListItem extends StandardListItem {
	static get metadata() {
		return metadata;
	}
}

NewListItem.define();

export default NewListItem;
