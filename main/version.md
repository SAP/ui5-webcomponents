commit 1aac3c50041dbd24cdcba6acb02d0134a2013ca6
Author: Boyan Rakilovski <boyan.rakilovski@sap.com>
Date:   Fri Jun 10 21:50:45 2022 +0300

    fix(ui5-button): adjust icon role (#5355)
    
    Issue:
    The ui5-button icon was announced by the screen readers
    when there is a text and a icon.
    
    Solution:
    The ui5-button icon has role "presentation" when we aren't
    in an icon only scenario.
    
    Fixes: #5288
