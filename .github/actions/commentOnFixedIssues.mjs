import { promises as fs } from 'node:fs';
import { success as issueCommenter } from '@semantic-release/github';

const getRelease = async (github, version) => {
	const releaseInfo = await github.request('GET /repos/{owner}/{repo}/releases/tags/{tag}', {
		owner: "SAP",
		repo: "ui5-webcomponents",
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
 */
export default async function run({ github }) {
  const lerna = await fs.readFile(new URL('../../lerna.json', import.meta.url), 'utf8');
  const { version } = JSON.parse(lerna);
  const release = await getRelease(github, version);
  const commits = getReleaseCommits(release);
  const Octokit = getOctokitShim(github);

  await issueCommenter({}, {
    options: { repositoryUrl: `https://github.com/SAP/ui5-webcomponents/`},
    commits,
    nextRelease: { version: `v${version}` },
    releases: [release],
    logger: console,
    env: process.env
  }, { Octokit });
}
