export class MetadataParser {
    async parse(file) {
        const content = this.removeMetadata(file.content);
        return {
            path: file.path,
            content,
        };
    }
    removeMetadata(content) {
        return content.replace(/^---[\s\S]+?---/g, "");
    }
}
//# sourceMappingURL=MetadataParser.js.map