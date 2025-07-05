commit 7c77980184a8814f5e9ad19be8925c7b993228a6
Author: Konstantin Gogov <konstantin.gogov@sap.com>
Date:   Fri Jul 4 15:33:39 2025 +0300

    fix(ui5-list): prevent toggle event bubbling from non-list items (#11843)
    
    - Add duck-typing check in onItemToggle using isListItemBase getter
    - Prevents unwanted toggle events from nested components like panels
    
    Fixes #11812
