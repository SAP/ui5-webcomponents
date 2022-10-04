commit 6ce8b2dee9cbf0ccbe2d310a241f02c173d85cd9
Author: Boyan Rakilovski <boyan.rakilovski@sap.com>
Date:   Tue Oct 4 10:37:15 2022 +0300

    feat(ui5-link): make acceessibleRole property public (#5879)
    
    * feat(ui5-link): make acceessibleRole property public
    
    - The previously private accessibleRole property is now made public, in order to enable
    application developers to configure a given ui5-link element to be interpreted as button
    by the accessibility tools.
    
    Fixes: #5686
