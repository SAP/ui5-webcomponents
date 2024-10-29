import { promises as fs } from 'node:fs';
import { success as issueCommenter } from '@semantic-release/github';

const getRelease = async (github, context, version) => {
	const { owner, repo } = context.repo;
	const releaseInfo = await github.request('GET /repos/{owner}/{repo}/releases/tags/{tag}', {
		owner,
		repo,
		tag: `v${version}`
	});
	const release = releaseInfo.data;
	release.url = release.html_url;

	return release;
};

const getReleaseCommits = (release) => {
	const commits = [];
	let counter = 0;

	let result;
	do {
		result = /commit\/(?<sha>\w{40})/gm.exec(release.body);
		if (result?.groups?.sha) {
			commits.push({ hash: result.groups.sha });
		}
		counter++
	} while (result && counter < 50);

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
 * @param options {object}
 * @param options.github {import("@octokit/rest/dist-types/index.d.ts").Octokit}
 * @param options.context
 */
export default async function run({ github, context }) {
  const lerna = await fs.readFile(new URL('../../lerna.json', import.meta.url), 'utf8');
  const { version } = JSON.parse(lerna);
  const release = await getRelease(github, context, version);
  const commits = getReleaseCommits(release);
  const Octokit = getOctokitShim(github);

  await issueCommenter({}, {
    options: { repositoryUrl: `https://github.com/${context.repo.owner}/${context.repo.repo}/`},
    commits,
    nextRelease: { version: `v${version}` },
    releases: [release],
    logger: console,
    env: process.env
  }, { Octokit });
}
