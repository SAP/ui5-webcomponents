import { promises as fs } from 'node:fs';

const extractChangelogSections = (releaseBody) => {
	const fixes = [];
	const features = [];
	const fixesMatch = releaseBody.match(/## Bug Fixes([\s\S]*?)(?=##|$)/);
	const featuresMatch = releaseBody.match(/## Features([\s\S]*?)(?=##|$)/);

	if (fixesMatch) {
		// Split lines, trim whitespace, and remove any leading bullet point (like "*" or "-")
		const fixEntries = fixesMatch[1].trim().split('\n').map(line => line.replace(/^[*-]\s*/, '').trim());
		fixes.push(...fixEntries);
	}
	if (featuresMatch) {
		const featureEntries = featuresMatch[1].trim().split('\n').map(line => line.replace(/^[*-]\s*/, '').trim());
		features.push(...featureEntries);
	}

	return { fixes, features };
};

const mergeReleaseChangelogs = (minorRelease, rcReleases) => {
	// Extract the existing changes from the minor release body
	const { fixes: minorFixes, features: minorFeatures } = extractChangelogSections(minorRelease.body);
	const fixes = [...minorFixes];
	const features = [...minorFeatures];

	// Add changes from each RC release
	rcReleases.forEach((release) => {
		const { fixes: rcFixes, features: rcFeatures } = extractChangelogSections(release.body);
		fixes.push(...rcFixes);
		features.push(...rcFeatures);
	})

	// Sort fixes and features alphabetically
	const sortedFixes = fixes.sort((a, b) => {
		const contentA = a.match(/\*\*(.*?)\*\*/)?.[1] || '';
		const contentB = b.match(/\*\*(.*?)\*\*/)?.[1] || '';
		return contentA.localeCompare(contentB);
	});

	const sortedFeatures = features.sort((a, b) => {
		const contentA = a.match(/\*\*(.*?)\*\*/)?.[1] || '';
		const contentB = b.match(/\*\*(.*?)\*\*/)?.[1] || '';
		return contentA.localeCompare(contentB);
	});

	return { fixes: sortedFixes, features: sortedFeatures };
}

const updateRelease = async (releaseContext) => {
	const releaseId = releaseContext.minorRelease.id;
	const releaseHeaderMatch = releaseContext.minorRelease.body.match(/^#\s\[.*?\]\(.*?\)\s\([\d-]+\)/);
	const releaseHeader = releaseHeaderMatch ? `${releaseHeaderMatch[0]}\n\n` : '';
	const formattedFixes = releaseContext.fixes.length ? `### Fixes\n- ${releaseContext.fixes.join('\n- ')}` : '';
	const formattedFeatures = releaseContext.features.length ? `### Features\n- ${releaseContext.features.join('\n- ')}` : '';
	const body = `${releaseHeader}${formattedFeatures}\n\n${formattedFixes}`.trim();

	try {
		await releaseContext.github.request('PATCH /repos/{owner}/{repo}/releases/{releaseId}', {
			owner: releaseContext.owner,
			repo: releaseContext.repo,
			body,
			releaseId,
		});

		console.log(`Release ${releaseContext.version} updated successfully:`, releaseContext);
	} catch (error) {
		console.error(`Error updating release ${releaseContext.version}:`, error );
	}
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
		const allReleases = (await github.request('GET /repos/{owner}/{repo}/releases', { owner, repo })).data;
		const rcReleases = allReleases.filter((release) => release.tag_name.includes(`v${version}-rc`));
		const minorRelease = allReleases.find((release) => release.tag_name === `v${version}`);

		// Merge RC changelogs
		const { fixes, features } = await mergeReleaseChangelogs(minorRelease, rcReleases);

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
