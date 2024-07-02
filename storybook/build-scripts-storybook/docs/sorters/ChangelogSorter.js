/**
 * Sort changelog files by version number
 * e.g 1.3.2, 1.2.3-rc.3 1.2.3-rc.2 1.2.3-rc.1, 1.2.1, 1.2.0, rc16, rc15
 */
export class ChangelogSorter {
    sort(files) {
        let sorted = files.sort((a, b) => {
            const aVersion = this.parseVersion(a.path);
            const bVersion = this.parseVersion(b.path);
            if (aVersion.major !== bVersion.major) {
                return bVersion.major - aVersion.major;
            }
            if (aVersion.minor !== bVersion.minor) {
                return bVersion.minor - aVersion.minor;
            }
            if (aVersion.patch !== bVersion.patch) {
                return bVersion.patch - aVersion.patch;
            }
            if (aVersion.prerelease !== bVersion.prerelease) {
                if (aVersion.prerelease === null) {
                    return -1;
                }
                if (bVersion.prerelease === null) {
                    return 1;
                }
                return aVersion.prerelease.localeCompare(bVersion.prerelease);
            }
            return 0;
        });
        sorted = sorted.map((file, index) => {
            file.path = `${index + 1}-${file.path}`;
            return file;
        });
        return sorted;
    }
    parseVersion(path) {
        const version = path.replace(/\.md$/, "");
        const [major, minor, patch, prerelease] = version.split(".");
        return {
            major: parseInt(major, 10),
            minor: parseInt(minor, 10),
            patch: parseInt(patch, 10),
            prerelease,
        };
    }
}
//# sourceMappingURL=ChangelogSorter.js.map