commit 9c26e8e4fa672ecd4ffced9a21c834c2da1a60c5
Author: ilhan orhan <ilhan.myumyun@sap.com>
Date:   Fri Jul 22 14:29:25 2022 +0300

    fix(MultoComboBox): fix component scoping (#5553)
    
    GroupHeaderListItem is used in the MultiComboboxPopoverTemplate and it should be part of the MultiCombobox dependencies in order to be identified and scoped, when Scoping is turned on.
    
    Fixes: #5521
