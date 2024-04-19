import { assert } from "chai";

const checkMissingDependencies = async (tags, tagsToIgnore) => {
	if (Array.isArray(tags) && tags.length > 1 && Array.isArray(tagsToIgnore) && tagsToIgnore.length > 0) {
		throw new Error(`tagsToIgnore is only allowed if you call checkMissingDependencies for a single tag`);
	}
	tags = Array.isArray(tags) ? tags : [tags];
	for (const tagIndex in tags) {
		const tag = tags[tagIndex];
		const elements = await browser.$$(`>>>${tag}`);
		for (let i = 0; i < elements.length; i++) {
			const missing = await elements[i].getMissingDependencies(tagsToIgnore);
			if (missing.length === 0) {
				assert.ok(true,`${tag} has no missing dependencies.`);
			} else {
				assert.notOk(true, `${tag} has missing dependencies: ${missing.join(", ")}`);
			}
		}
	}
}

export { checkMissingDependencies };