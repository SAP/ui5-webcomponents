commit 9e47011d4e012d281c6ba9e840d24770bf3b88e5
Author: ilhan orhan <ilhan.myumyun@sap.com>
Date:   Thu Aug 11 16:40:23 2022 +0300

    ci: lint scoping on PRs (#5639)
    
    It's good to perform a check for styles breaking the scoping as this is an spect often forgotten by developers. There are two places to enable this scoping lint - on git push locally or as a github action upon PR creation. Currently it's done via pre-push check.
    
    FIXES: #4574
