commit d8137b7b6239e0695e34d62e7b0179babf7a747b
Author: Nikolay Deshev <nikolay.deshev@sap.com>
Date:   Tue Nov 1 09:10:44 2022 +0200

    fix(ui5-textarea): refactor the component - restructuring and CSS improvements (#5712)
    
    * fix(ui5-textarea): show exceeded text when maxLength is 0
    
    related to #5384
    
    * fix(ui5-textarea): show exceeded text when maxLength is 0
    
    * fix(ui5-textarea): show exceeded text when maxLength is 0
    
    fix test
    
    * fix(ui5-textarea): show exceeded text when maxLength is 0
    
    fix test
    
    * fix(ui5-textarea): draft - component refactoring
    
    related to #4512
    fixes: #3843 #5384 #4986
    
    * fix(ui5-textarea): revert show exceeded text when maxLength is 0"
    
    This reverts commit 7b426651a105c67337d748795e480263bd924d2a as it is not part of this change
    
    * fix(ui5-textarea): revert
    
    this reverts commit e1e85d872dc5212c3be0b1896a98aff724baab49.
    
    * fix(ui5-textarea): revert
    
    This reverts commit 7200061b374bbc5fbc1e9536ffda81d2efd426e4.
    
    * fix(ui5-textarea): draft - component refactoring
    
    latest changes
    
    * fix(ui5-textarea): draft - component refactoring
    
    adjust the height calculations to be correct the way they are implemented as a logic now
    
    * fix(ui5-textarea): draft - component refactoring
    
    more height styles adjustments
    
    * fix(ui5-textarea): component refactoring - make height calculations in the css
    
    height calculations are moved in the css
    
    * fix(ui5-textarea): draft - component refactoring - css refactoring
    
    * fix(ui5-textarea): draft - component refactoring - fix horizon styles
    
    * fix(ui5-textarea): draft - component refactoring - refactor fiori_3 styles
    
    * fix(ui5-textarea): draft - component refactoring - fix disabled and readonly styles
    
    * fix(ui5-textarea): component refactoring - fix hc styles
    
    * fix(ui5-textarea): component refactoring - resolve merge conflict
    
    * fix(ui5-textarea): component refactoring - fix tests
    
    * fix(ui5-textarea): component refactoring - fix code review comments
    
    * fix(ui5-textarea): component refactoring - fix review comments
    
    * fix(ui5-textarea): component refactoring - manual testing fixes
    
    * fix(ui5-textarea): component refactoring - testing fixes
    
    * fix(ui5-textarea): textarea refactoring - css fixes
    
    * fix(ui5-textarea): component refactoring - css fixes
    
    * fix(ui5-textarea): component refactoring - css fixes
    
    * fix(ui5-textarea): component refactoring - padding fixes
    
    * fix(ui5-textarea): component refactoring
    
    * fix(ui5-textarea): component refactoring - styles improvements
    
    * fix(ui5-textarea): component refactoring - styles improvements
    
    * fix(ui5-textarea): component refactoring - styles improvements
    
    * fix(ui5-textarea): component refactoring - styles improvements
    
    * fix(ui5-textarea): component refactoring - styles improvements
    
    adapt height and paddings to the new specifications
    fix other issues in high contrast themes
    
    * fix(ui5-textarea): component refactoring - remove min-height from the inner textarea
    
    * fix(ui5-textarea): component refactoring - add correct min-height to Belize HC
    
    * fix(ui5-textarea): component refactoring - clean up unused vars
    
    * fix(ui5-textarea): component refactoring - styles improvements
    
    * fix(ui5-textarea): component refactoring - fix growing when rows prop is set to 1
    
    * fix(ui5-textarea): component refactoring - fix top paddding horizon dark
    
    * fix(ui5-textarea): component refactoring - styles improvements
    
    * fix(ui5-textarea): component refactoring - code review cleanup
    
    * fix(ui5-textarea): remove local css vars (use global) if used only once
    
    * fix(ui5-textarea): component refactoring - testing fixes
    
    * fix(ui5-textarea): component refactoring - fix edge case styles
    
    * fix(ui5-textarea): component refactoring - fix css bug
