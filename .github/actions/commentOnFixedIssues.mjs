import { promises as fs } from 'node:fs';
import { success as issueCommenter } from '@semantic-release/github';

const getReleaseCommits = async (github, context, version) => {
	const commits = new Set();
	const { owner, repo } = context.repo;
	const releaseInfo = await github.request('GET /repos/{owner}/{repo}/releases/tags/{tag}', {
		owner,
		repo,
		tag: `v${version}`
	});
	const release = releaseInfo.data;
	release.url = release.html_url;

	// Using matchAll for all SHA matches and adding unique entries to a Set
	const releaseBody = release.body || '';
	const shaRegex = /commit\/(?<sha>\w{40})/g;
	for (const match of releaseBody.matchAll(shaRegex)) {
		if (match.groups?.sha) {
			commits.add({ hash: match.groups.sha });
		}
	}

	// Converting Set back to an array to get unique commits as array
	return Array.from(commits);
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
  const { owner, repo } = context.repo;
  const commits = await getReleaseCommits(github, context, version);
  const Octokit = getOctokitShim(github);


  try {
	const semanticRleaseContext = {
		options: { 
			repositoryUrl: `https://github.com/${owner}/${repo}/` 
		},
		commits,
		nextRelease: { version: `v${version}` },
		releases: [release],
		logger: console,
		env: process.env
	};

	console.log('Commits:', commits.toString());
	console.log('semanticRleaseContext:', semanticRleaseContext);

	await issueCommenter({}, semanticRleaseContext, { Octokit });

  } catch (error) {
	console.error('Error in posting comment:', error);
  }

  
}
