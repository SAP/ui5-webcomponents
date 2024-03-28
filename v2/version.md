commit d3e2ed141df6812c09206c187a47423947353fc4
Author: kskondov <konstantin.kondov@sap.com>
Date:   Thu Mar 28 17:50:02 2024 +0200

    refactor(ui5-tabcontainer): remove TabContainerBackgroundDesign enume… (#8570)
    
    Removes `TabContainerBackgroundDesign` enum in favour of  `BackgroundDesign` enum.
    
    BREAKING CHANGE: If you previously imported `TabContainerBackgroundDesign`, use `BackgroundDesign` instead.
    
    Relates to https://github.com/SAP/ui5-webcomponents/issues/8461
