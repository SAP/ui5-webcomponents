commit cab404fd4e554f19b4e50a9c3d12605390fbffb7
Author: ilhan orhan <ilhan.myumyun@sap.com>
Date:   Tue Jul 26 16:26:33 2022 +0300

    ci: add auto-close of stale issues (#5560)
    
    The action is scheduled to run every day at 00:00 UTC and mark inactive issues for 21 days as "Stale" and close "author action", "wontfix" and "stale" issues after 28 days of inactivity.
