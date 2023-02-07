commit 0f1b5cc8074b0ceb41fd3a98e70b1a96ea94e590
Author: Petar Dimov <32839090+dimovpetar@users.noreply.github.com>
Date:   Tue Feb 7 16:10:12 2023 +0200

    refactor(ui5-tabcontainer): Simplify _handleResize (#6435)
    
    Reasons:
    1) _handleResize was async function, which is not supported type of callback by the ResizeHandler
    2) It awaited the rendering of the TabContainer, which is unnecessary. The logic is already in the onAfterRendering hook
    3) Rarely (when the media range changed), _setItemsForStrip was called twice - once onAfterRendering and once in _handleResize
    
    Solution:
    Simplify the logic by always invalidating on resize
