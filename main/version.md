commit 918d9350d7e60578db94315cf09ac89bdeef2947
Author: ilhan orhan <ilhan.myumyun@sap.com>
Date:   Wed Jan 25 08:29:51 2023 +0200

    fix: force bump all packages
    
    Configure the Github action "release.yaml" for auto-release to force bump the versions of all packages with the "--force-publish" flag
    and
    specify updated dependencies in updated packages exactly (with no punctuation), instead of as semver compatible (with a ^) with the "--exact" flag
