commit d2fc095515de7c77f06a4d423f59702b14460a91
Author: Henrique Mattos <henrique@visualworks.com.br>
Date:   Mon Sep 19 07:10:58 2022 +0200

    fix(framework): remove .com from URL font-face 72Black (#5822)
    
    The refactoring to use the new SDK URL left a `.com` after the new
    domain `sdk.openui5.org`.
