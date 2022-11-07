/**
 * ""                        -> ""
 * "noExtension"             -> ""
 * "file.txt"                -> ".txt"
 * "file.with.many.dots.doc" -> ".doc"
 * ".gitignore"              -> ""
 *
 * @param { string } fileName - the file name
 * @returns { string }
 */
const getFileExtension = (fileName: string) => {
	const dotPos = fileName.lastIndexOf(".");

	if (dotPos < 1) {
		return "";
	}

	return fileName.slice(dotPos);
};

export default getFileExtension;
