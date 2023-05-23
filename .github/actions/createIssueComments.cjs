// const issueCommenter = require('@semantic-release/github/lib/success.js');

const commitShaRegExp = /commit\/(?<sha>\w{40})/gm;

const getCommitsForRelease = release => {
	let result = [];

	do {
		result = commitShaRegExp.exec(release.body);
		if (result && result.groups && result.groups.sha) {
			commits.push({ hash: result.groups.sha });
		}
	} while (result);

	return result;
}
module.exports = async function run({ github, context, version = "1.13.0" }) {
  const { data: release } = await github.repos.getReleaseByTag({
	owner: context.repo.owner,
	repo: context.repo.repo,
	tag: `v${version}`
  });
  release.url = release.html_url;

  // find commits of this release
  const commits = getCommitsForRelease(release)

  const semanticReleaseContext = {
	options: {
	  repositoryUrl: `https://github.com/${context.repo.owner}/${context.repo.repo}`
	},
	commits,
	nextRelease: {
	  version: `v${version}` // new release version
	},
	releases: [release], // current github release
	logger: console,
	env: process.env
  };

  console.log(semanticReleaseContext);
//   await issueCommenter({}, semanticReleaseContext);
}