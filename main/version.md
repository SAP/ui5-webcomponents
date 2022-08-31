commit d49427f4a07d1f1c744bbc8f9964307662718440
Author: Boyan Rakilovski <boyan.rakilovski@sap.com>
Date:   Wed Aug 31 11:18:25 2022 +0300

    fix(ui5-button): provide tooltip for icon-only buttons (#5734)
    
    According to UX guidelines, every instance of an icon-only button needs a tooltip.
    When the inner ui5-icon element doesn't have a default one, the tooltip property
    should be provided at the application side.
    
    Related to: #5687
    Related to: #5596
    Related to: #5505
