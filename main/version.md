commit cec811951ec27571acb960a3742a03093c96c6f7
Author: gmkv <georgi.minkov@sap.com>
Date:   Thu Jun 30 13:40:02 2022 +0300

    fix(framework): correct use of arrow keys for ItemNavigation in RTL (#5408)
    
    In RTL, the left and right arrow keys now correctly move the focus for
    horizontally navigable items.
    
    Fixes: #5166
