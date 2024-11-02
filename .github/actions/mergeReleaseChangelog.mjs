import { promises as fs } from 'node:fs';

const extractChangelogSections = (releaseBody) => {
	const fixes = [];
	const features = [];
	const fixesMatch = releaseBody.match(/## Fixes([\s\S]*?)(?=##|$)/);
	const featuresMatch = releaseBody.match(/## Features([\s\S]*?)(?=##|$)/);

	if (fixesMatch) {
		fixes.push(fixesMatch[1].trim());
	}
	if (featuresMatch) {
		features.push(featuresMatch[1].trim());
	}

	return { fixes, features };
};

const mergeReleaseChangelogs = (releases) => {
	const fixes = [];
	const features = [];

	releases.forEach((release) => {
		const { fixes: rcFixes, features: rcFeatures } = extractChangelogSections(release.body);
		fixes.push(...rcFixes);
		features.push(...rcFeatures);
	})

	return { fixes, features };
}

const updateRelease = async (releaseContext) => {
	const formattedFixes = fixes.length ? `### Fixes\n- ${fixes.join('\n- ')}` : '';
	const formattedFeatures = features.length ? `### Features\n- ${features.join('\n- ')}` : '';
	const body = `${formattedFixes}\n\n${formattedFeatures}`.trim();
	const tag = `v${releaseContext.version}`; // Ensure `version` is defined in your script's scope

	try {
		const response = await releaseContext.github.request('PATCH /repos/{owner}/{repo}/releases/tags/{tag}', {
			owner: releaseContext.owner,
			repo: releaseContext.repo,
			tag,
			body,
		});

		console.log("Release updated successfully:", response.data);
	} catch (error) {
		console.error("Error updating release:", error);
	}

	if (!response.ok) {
		throw new Error(`Failed to update release: ${response.statusText}`);
	}
	console.log('Minor release changelog updated successfully.');
};

/**
 * Publishes comments to issues that are fixed and released.
 * @param options {object}
 * @param options.github {import("@octokit/rest/dist-types/index.d.ts").Octokit}
 * @param options.context
 */
export default async function run({ github, context }) {
	const lerna = await fs.readFile(new URL('../../lerna.json', import.meta.url), 'utf8');
	const { version } = JSON.parse(lerna);
	if (!version.startsWith("2")) {
		console.warn('Skip: the task is relevant for version 2');
		return;
	}

	try {
		const { owner, repo } = context.repo;
		const allReleases = await github.request('GET /repos/{owner}/{repo}/releases', { owner, repo });
		const rcReleases = allReleases.filter((release) => release.tag_name.includes(`v${version}-rc`));
		const minorRelease = allReleases.find((release) => release.tag_name === `v${version}`);

		// Merge RC changelogs
		const { fixes, features } = await mergeReleaseChangelogs(rcReleases);

		const minorReleaseContext = {
			github,
			version,
			owner,
			repo,
			minorRelease,
			fixes,
			features
		}
		
		// Update the minor release with aggregated changelog
		await updateRelease(minorReleaseContext);

	  } catch (error) {
		console.error('Error:', error);
	  }
}