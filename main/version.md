commit 56cc99574fa0a4bc1a4fcaefd4b2beec602e4d30
Author: Boyan Rakilovski <boyan.rakilovski@sap.com>
Date:   Fri Jul 15 10:13:05 2022 +0300

    fix(ui5-date-picker): adjust value help icon role (#5419)
    
    The ui5-date-picker value help icon is still decorative, but now has role "button".
    On desktop the value help icon should be hidden from the screen reader.
    For mobile devices the icon is visible for the screen readers, in order to enable
    explore by touch scenarios.
    
    Fixes: #5378
