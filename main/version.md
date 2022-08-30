commit 3acd9bf5b44b1de3d919e46a5292dfbdae2ad340
Author: Boyan Rakilovski <boyanrakilovski@gmail.com>
Date:   Tue Aug 30 17:48:59 2022 +0300

    fix(ui5-calendar): adjust the role attribute of the header actions elements (#5723)
    
    fix(ui5-calendar): adjust the role attribute in the header
    
    The elements representing the previous, month, year and next
    actions in the ui5-calendar header now have role "button"
    as per specification.
    
    Fixes: #5708
