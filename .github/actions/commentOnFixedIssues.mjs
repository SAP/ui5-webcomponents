import { promises as fs } from 'node:fs';
import { success as issueCommenter } from '@semantic-release/github';

const getRelease = async (github, version) => {
	const releaseInfo = await github.request('GET /repos/{owner}/{repo}/releases/tags/{tag}', {
		owner: context.repo.owner,
		repo: context.repo.repo,
		tag: `v${version}`
	});
	const release = releaseInfo.data;
	release.url = release.html_url;

	return release;
};

const getReleaseCommits = (release) => {
	const commits = [];

	let result;
	do {
		result = /commit\/(?<sha>\w{40})/gm.exec(release.body);
		if (result?.groups?.sha) {
			commits.push({ hash: result.groups.sha });
		}
	} while (result);

	return commits;
};

const getOctokitShim = (github) => {
	return new Proxy(class {}, {
		construct(target, argArray, newTarget) {
			return github;
		}
	});
}

/**
 * Publishes comments to issues that are fixed and released.
 * @param options.github
 * @param options.context
 * @returns {Promise<void>}
 */
export default async function run({ github, context }) {
  const lerna = await fs.readFile(new URL('../../lerna.json', import.meta.url), 'utf8');
  const { version } = JSON.parse(lerna);
  const release = await getRelease(version);
  const commits = getReleaseCommits(release);
  const Octokit = getOctokitShim(github);

  await issueCommenter({}, {
    options: { repositoryUrl: `https://github.com/${context.repo.owner}/${context.repo.repo}`},
    commits,
    nextRelease: { version: `v${version}` },
    releases: [release],
    logger: console,
    env: process.env
  }, { Octokit });
}
