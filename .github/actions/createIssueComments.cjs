const commitShaRegExp = /commit\/(?<sha>\w{40})/gm;

module.exports = async function run({
	github,
	context,
	version
}) {
	const {
		data: release
	} = await github.repos.getReleaseByTag({
		owner: context.repo.owner,
		repo: context.repo.repo,
		tag: `v${version}`
	});
	release.url = release.html_url;

	console.log(release);
	// const commits = [];
	// let result;
	// do {
	// 	result = commitShaRegExp.exec(release.body);
	// 	if (result && result.groups && result.groups.sha) {
	// 		commits.push({
	// 			hash: result.groups.sha
	// 		});
	// 	}
	// } while (result);
};