
module.exports = async function run({ github, context, version }) {
  const relaseInfo = await github.repos.getReleaseByTag({
	owner: context.repo.owner,
	repo: context.repo.repo,
	tag: `v${version}`
  });
 
  console.log(relaseInfo)
}