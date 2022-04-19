#!/bin/bash

# https://gist.github.com/domenic/ec8b0fc8ab45f39403dd/e445116166c79d7ac35eb38a5d348d546f3d1620
# Copyright 2018 Domenic Denicola
# Released under the MIT license:
#
# Permission is hereby granted, free of charge, to any person obtaining a copy of this software and
# associated documentation files (the "Software"), to deal in the Software without restriction, including
# without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
# copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the
# following conditions:
#
# The above copyright notice and this permission notice shall be included in all copies or substantial
# portions of the Software.
#
# THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED
# TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
# THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF
# CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
# DEALINGS IN THE SOFTWARE.
#

#!/bin/bash

set -e # Exit with nonzero exit code if anything fails

# Determine if the current commit is release
TRAVIS_MASTER_BRANCH="master"
TRAVIS_LATEST_RELEASE_WEBSITE_BRANCH="latest-release-website"

# Config variables
REPO=`git config remote.origin.url`
SSH_REPO=${REPO/https:\/\/${GH_URL}\//git@${GH_URL}:}
SHA=`git rev-parse --verify HEAD`

# Clone the existing gh-pages for this repo into gh-pages
git clone --quiet --branch=gh-pages $REPO gh-pages || git checkout --orphan gh-pages

echo "Before remove gh-pages"
ls -a gh-pages

if [ "$TRAVIS_BRANCH" == "$TRAVIS_LATEST_RELEASE_WEBSITE_BRANCH" ]; then
  ###
  ### Publish docs on commit in latest-release-website branch
  ###

  echo "Before update release version on gh-pages"

  # Enable use of extended pattern matching operators(*, ?, @, !)
  shopt -s extglob

  # Remove all folders and files from gh-pages, but folder master
  cd gh-pages
  find . -maxdepth 1 ! -name master ! -name .git -exec rm -rv "{}" \; || exit 0
  cd ..

  # Run the build again so rollup can generate the correct public path urls
  cd $TRAVIS_BUILD_DIR
  yarn build:playground

  # Move master build folder to gh-pages folder
  cp -Rf $TRAVIS_BUILD_DIR/packages/playground/dist/* gh-pages

  # put the commit id as version
  echo "$(git log -1 HEAD)" > gh-pages/version.txt

  echo "After update release version on gh-pages"
  ls -a gh-pages

  ###
  ### End of publish docs on commit in latest-release-website branch
  ###

  elif [ "$TRAVIS_BRANCH" == "$TRAVIS_MASTER_BRANCH" ]; then
  ###
  ### Publish master on every commit in master branch
  ###

  echo "Before update master version on gh-pages"

  # Clean gh-pages existing contents
  rm -rf gh-pages/master|| exit 0

  mkdir gh-pages/master

  # Run the build again so rollup can generate the correct public path urls
  cd $TRAVIS_BUILD_DIR
  yarn build:playground:master

  # Move master build folder to gh-pages folder
  cp -Rf $TRAVIS_BUILD_DIR/packages/playground/dist/* gh-pages/master

  # put the commit id as version
  echo "$(git log -1 HEAD)" > gh-pages/master/version.txt

  echo "After update master version on gh-pages"
  ls -a gh-pages

  ###
  ### End of publish master on every commit in master branch
  ###
fi



# Configure Git
cd gh-pages
git config user.name "$COMMIT_AUTHOR_NAME"
git config user.email "$COMMIT_AUTHOR_EMAIL"

# Prepare commit
git add -N . # consider untracked files for git diff

# If there are no changes to the compiled build (e.g. this is a README update) then just bail.
if [[ -z `git diff --exit-code` ]]; then
  echo "No changes to the output on this push; exiting."
  exit 0
fi

# Commit the "changes", i.e. the new version.
# The delta will show diffs between new and old versions.
git add .
git commit -m "Automatic update by Travis CI #$TRAVIS_BUILD_NUMBER, commit ${SHA}"

# Get the deploy key by using Travis's stored variables to decrypt deploy_key.enc
ENCRYPTED_KEY_VAR="encrypted_${ENCRYPTION_LABEL}_key"
ENCRYPTED_IV_VAR="encrypted_${ENCRYPTION_LABEL}_iv"
ENCRYPTED_KEY=${!ENCRYPTED_KEY_VAR}
ENCRYPTED_IV=${!ENCRYPTED_IV_VAR}
openssl aes-256-cbc -K $ENCRYPTED_KEY -iv $ENCRYPTED_IV -in ../deploy/deploy_key.enc -out ../deploy_key -d
chmod 600 ../deploy_key
eval `ssh-agent -s`
ssh-add ../deploy_key

# Push new change
git push $SSH_REPO gh-pages
