commit 8edc1114c1a08005483a18dd04f23cdf9e050b5c
Author: Dobrin Dimchev <dobrin.dimchev@sap.com>
Date:   Fri Sep 5 16:37:44 2025 +0300

    fix(ui5-list): growing with scroll improved (#12087)
    
    Fixes: https://github.com/SAP/ui5-webcomponents/issues/11687
    
    ## Description
    
    Refactors the List component's scroll growing functionality to use intersection observers with start/end markers instead of unreliable scroll height calculations and scroll container detection.
    
    ## Background Problems
    
    The existing scroll growing implementation had several issues:
    - **Issue https://github.com/SAP/ui5-webcomponents/issues/10442**
    False positive load-more events during rerender/content changes
    - **Issue https://github.com/SAP/ui5-webcomponents/issues/11687**
    Failed detection when List is inside external scrollable containers
    - **Issue https://github.com/SAP/ui5-webcomponents/issues/11461**
    Firefox issue solved by the new implementation as well
    
    
    ## Solution
    
    Replaces the previous approach with:
    - **Start marker**: `<span>` element positioned at the beginning of the scroll container to track when user has scrolled down
    - **End marker**: `<span>` element positioned at the end to trigger load-more events
    - **Viewport-based intersection observers**: Two dedicated observers that detect marker visibility relative to the viewport
    - **State management**: `_startMarkerOutOfView` property to ensure container was scrolled down
    
    ## Test Coverage
    
    - DOM presence tests for start/end markers
    - Intersection observer functionality validation
    - **Edge case #1**: Rerender scenarios that previously caused false events
    - **Edge case #2**: External scrollable containers that previously failed detection
