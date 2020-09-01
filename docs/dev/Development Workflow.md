# General development workflow
This document aims to explain the steps component developers would have to perform
on daily basis from forking the project to merging a change, emphasising on the Github workflow.


## 1. Fork the UI5 Web Components repository
See how to fork a repo [here](https://docs.github.com/en/github/getting-started-with-github/fork-a-repo).


## 2. Clone the UI5 Web Components repository
See how to clone a repo [here](https://docs.github.com/en/github/creating-cloning-and-archiving-repositories/cloning-a-repository).


## 3. Run the project

*3.0.* Make sure you have the following prerequisites installed
- [Yarn](https://yarnpkg.com/en)
- [Node.js](https://nodejs.org/) (**version 12 or higher**)


*3.1.* Install all dependencies
```sh
yarn
```

*3.2.* Build and serve the project
```sh
yarn start
```
Once the project is served, you can explore the components 
on http://localhost:8080/test-resources/pages/ for the `main` package
and http://localhost:8081/test-resources/pages/ for the `fiori` package.

*Note: The server will reload the pages, whenever you make changes in the code.*


## 4. Develop 

*4.1.* Read the dedicated tutorials for component developers

- [Development Conventions and Guidelines](../Guidelines.md)
- [Developing UI5 Web Components](./Developing&#32;Web&#32;Components.md)
- [Testing UI5 Web Components](./Testing&#32;Web&#32;Components.md)
- [What is Metadata?](./Metadata.md)

*4.2.* Create a local branch within your fork and work with it as usual.

*4.3.* Before committing, run the linter to check if your code is written according to the project eslint configuration.

```sh
$ yarn lint
```

*4.4.* Before committing, run the test of the component you are working on (see the article for testing above) to catch issues as soon as possible.

```sh
$ cd packages/main
$ yarn test test/specs/Button.spec.js
```

## 5. Open Pull Request (PR) from fork

You can open a pull request to the upstream repository from any branch or commit in your fork.
We recommend that you make changes in a topic branch (not in your local master), so that you can push followup commits if you receive feedback on your pull request. 

You can open a pull request from the Github UI. 

*5.1.* Find the "Pull requests" tab and then press the "New pull request" button.

*5.2.* Compare the master branch of the upstream with a branch from your fork.

*Note: The full guide to open PR from fork can be found [here](https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request-from-a-fork).*

*5.3.* Once the PR is created you would to accept CLA agreement.
Just follow the link posted in the PR by the CLA assistant.

*Note: This is required only for you first PR.*

*5.4.* Immediately after the PR is created a central build process starts to verify the change,
building the project and running all tests.
In case you are interested in the build output, you can follow the link at the bottom of the PR page, called "continuous-integration/travis-ci/pr"

*5.5.* Wait for our code review and approval. 
After the PR is approved, the UI5 Web Components team will merge the change into the master.


## 6. Update Pull Request, created from a fork

You often would need to update your pull request, especially when you need to address review comments.
To update your pull request, you have to push commits to the branch, that the pull request is based on
and the changes will be reflected in the pull request.

*Note: We recommend syncing your fork, before pushing commits to resolve merge conflicts beforehand.*

*Note: The full guide to update PR can be found [here](https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/committing-changes-to-a-pull-request-branch-created-from-a-fork).*

## 7. Sync the fork

With the time your fork will be out of sync with the original repository
and you would need to update it.

*7.1.* Specify a new remote upstream repository that will be synced with the fork.

```sh
$ git remote add upstream https://github.com/SAP/ui5-webcomponents.git
```

*7.2.* Fetch the branches and their respective commits from the upstream repository.
Commits to master will be stored in a local branch, upstream/master.

```sh
$ git fetch upstream
```

*7.3.*. Check out your fork's local master branch.

```sh
$ git checkout master
```

*7.4.*. Merge the changes from upstream/master into your local master branch.
This brings your fork's master branch into sync with the upstream repository, without losing your local changes.

```sh
$ git merge upstream/master
```

*Note: The full guide to sync a fork can be found [here](https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/syncing-a-fork).*
