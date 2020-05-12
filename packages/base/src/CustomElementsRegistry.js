const DefinitionsSet = new Set();

const registerTag = tag => {
	DefinitionsSet.add(tag);
};

const isTagRegistered = tag => {
	return DefinitionsSet.has(tag);
};

const getAllRegisteredTags = () => {
	const arr = [];
	DefinitionsSet.forEach(tag => {
		arr.push(tag);
	});
	return arr;
};

export {
	registerTag,
	isTagRegistered,
	getAllRegisteredTags,
};
