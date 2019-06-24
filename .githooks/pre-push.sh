#!/bin/sh
#
# To enable this hook, run this command from the root folder of the project
#   $ git config core.hooksPath .githooks

cd "$(git rev-parse --show-toplevel)"
yarn lint