import fs from "fs/promises";
import path from "path";

/**
 * when a new version of the icons is availbale, they are generated as `.ts` files in `src/generated-tracked` and submitted
 * after the build runs, they and up as `.js` files in `dist/generated-tracked`, this script moves them to `dist` top level
 */

const moveGeneratedTrackedToDist = async () => {
	const filesToMove = await fs.readdir("dist/generated-tracked");
	// console.log({filesToMove})
	await Promise.all(filesToMove.map(file => {
		return fs.rename(path.join("dist/generated-tracked", file), `dist/${file}`)
	}));
}

await moveGeneratedTrackedToDist();
fs.rmdir("dist/generated-tracked");