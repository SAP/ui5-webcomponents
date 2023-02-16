commit 79274c8e442cf5854a7fe6327f25aaed04312103
Author: Dobrin Dimchev <dobrin.dimchev@sap.com>
Date:   Thu Feb 16 10:29:12 2023 +0200

    feat(playground): next playground with storybook (#5831)
    
    * chore: correct html tags
    
    * fix(framework): strict self closing html
    
    * fix(framework): correct html and consistent heading inside samples
    
    * feat(playground): next playground with storybook
    
    * feat: next playground with storybook
    
    * feat: add poc
    
    * feat: add EXCLUDE_LIST const
    
    * feat: add EXCLUDE_LIST const
    
    * feat: add avatar example story
    
    * feat: add ui5-avatar-group story
    
    * feat: add ui5-avatar-group story
    
    * feat: add List stories
    
    Co-authored-by: PetyaMarkovaBogdanova <petya.markova-bogdanova@sap.com>
    
    * feat(ui5-li): add stories
    
    * feat(storybook): add script for generating stories (#5898)
    
    There two new scripts / tasks.
    The first task is 'prepare:samples:initial' which converts UI5 WC samples (*.sample.html) into stories (*.stories.mdx). If a sample isn't present, a placeholder/dummy story is generated.
    The second task is 'prepare:samples:next' which generates argsTypes.js and Description.md for the corresponding *stories.mdx file.
    
    * chore: integrate with build scripts
    
    * feat: switch to CSF
    
    * chore: delete ignored file
    
    * chore: update .gitignore
    
    * chore: remove sample corrections
    
    * fix: theme background
    
    * chore: remove jsodcs corrections
    
    * fix: filter private members, add html addon, show method members
    
    * fix: restore stories
    
    * chore: remove testing scripts
    
    * fix: exclude non-public apis
    
    * feat: add tsc
    
    * feat: remove storybook build from playground deployment
    
    * chore: remove unused code
    
    * feat: only logged events inside the actions tab are prefixed with ui5-
    
    * fix: remove controls matchers from preview.js as our types are different (strings, enums, ect.)
    
    * fix: type check storybook config files
    
    * feat: provide story args types
    
    * feat: add Dialog story
    
    * feat: add fcl story
    
    * feat: add readonly props
    
    * fix: improve namings
    
    * Revert "feat: remove storybook build from playground deployment"
    
    This reverts commit 025e68af7c2cda98d498cf347c448c55bf6247fc.
    
    * fix: babel on build
    
    * fix: static assets path
    
    * fix: default theme
    
    * feat: add since and tag name
    
    * feat: add since and package to other components
    
    * fix: component groups in sidebar
    
    * feat: update to 7.0
    
    * feat: add github btn and logo
    
    * fix: inline stories
    
    * fix: story interface
    
    * fix: brandImage asset path
    
    * fix: addon title
    
    * fix: update addon-html config
    
    * feat: process changelogs
    
    * feat: remark-gfm mdx
    
    * fix: add .gitkeep
    
    * fix: misleading imports in mdx files
    
    * chore: restore file changes
    
    * docs: documentation parser docs
    
    * fix: comments
    
    * fix: comments
    
    * fix: add .nojekyll
    
    * chore: clean
    
    * fix: remove index.html
    
    * fix: brandUrl
    
    ---------
    
    Co-authored-by: PetyaMarkovaBogdanova <petya.markova-bogdanova@sap.com>
    Co-authored-by: Plamen Ivanov <plamen.ivanov01@sap.com>
    Co-authored-by: Vladislav Tasev <vladislav.tasev@sap.com>
