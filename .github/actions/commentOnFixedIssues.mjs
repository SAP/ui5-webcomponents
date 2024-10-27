import { success as issueCommenter } from '@semantic-release/github';
import { readFileSync } from 'node:fs';

const commitShaRegExp = /commit\/(?<sha>\w{40})/gm;

const getRelease = async (version) => {
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
    result = commitShaRegExp.exec(release.body);
    if (result && result.groups && result.groups.sha) {
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
  const { version } = JSON.parse(readFileSync(new URL('../lerna.json', import.meta.url)).toString());
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