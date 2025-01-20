commit 07d4133141265757cfc4baf1e95bf09b9603451f
Author: Petya Markova <petya.markova-bogdanova@sap.com>
Date:   Fri Jan 17 18:03:35 2025 +0200

    chore(ui5-shellbar): evolution redesign introduced (#10264)
    
    * chore(ui5-shellbar): design evolution
    
    * refactor(ui5-shellbar): menuItems slot backward compatibility (#10077)
    
    * fix(ui5-shellbar): adjust font size
    
    * refactor(ui5-shellbar): actions reversed ordering (#10086)
    
    Co-authored-by: Dobrin Dimchev <dobrin.dimchev@sap.com>
    Co-authored-by: PetyaMarkovaBogdanova <petya.markova@sap.com>
    
    * refactor(ui5-shellbar): apply max-width on search input (#10106)
    
    * feat(ui5-shellbar): new overflow badge behavior (#10098)
    
    With the new design if we have a notifications-count attr and/or an
    ui5-shellbar-item with count attr we now display different
    badges on the overflow button. If none of the above is present, no
    badge is displayed.
    
    * feat(ui5-shellbar): added arrow navigation (#10105)
    
    Arrow navigation is added for the ui5-shellbar
    
    * refactor(ui5-shellbar): shown class on otb button
    
    ---------
    
    Co-authored-by: yanaminkova <yana.minkova@sap.com>
    Co-authored-by: PetyaMarkovaBogdanova <petya.markova@sap.com>
    
    * fix(ui5-shellbar): fix focus styles for profile image button (#10137)
    
    * chore: updated sample file (#10136)
    
    * Add shellbar additional context separators (#10108)
    
    * feat(ui5-shellbar): added arrow navigation
    
    * refactor(ui5-shellbar): start and end separators
    
    ---------
    
    Co-authored-by: yanaminkova <yana.minkova@sap.com>
    Co-authored-by: PetyaMarkovaBogdanova <petya.markova@sap.com>
    
    * feat(ui5-shellbar): added applySideNavigationStyles property
    
    The new applySideNavigationStyles makes sure to apply the correct
    CSS paddings/styles to the ShellBar specified by visual design
    when ShellBar is used as adjacent to ui5-side-navigation.
    
    * chore: ShellBar sample updated
    
    ShellBar is now a header slot to NavigationLayout in its sample HTML file.
    
    Additionally the padding specific styling for it is changed in
    NavigationLayout CSS to implement visual spec.
    
    * chore: shellBar is now a header slot to NavigationLayout in its sample HTML file
    Additionally the padding specific styling for it is changed in
    NavigationLayout CSS to implement visual spec.
    
    ---------
    
    Co-authored-by: Petya Markova <petya.markova-bogdanova@sap.com>
    Co-authored-by: yanaminkova <yana.minkova@sap.com>
    Co-authored-by: PetyaMarkovaBogdanova <petya.markova@sap.com>
    
    * feat(ui5-shellbar): remove usage of secondary-title
    
    Co-authored-by: Dobrin Dimchev <dobrin.dimchev@sap.com>
    
    * fix(ui5-dynamic-page): header role added
    
    * chore(ui5-shellbar): item info tooltip property (#10186)
    
    Co-authored-by: PetyaMarkovaBogdanova <petya.markova@sap.com>
    
    * feat(ui5-shellbar): overflow behaviour (#10224)
    
    * chore: new overflow logic
    
    * chore: clean
    
    * chore: more clean
    
    * fix: separators visiiblity
    
    * feat(ui5-shellbar): add screen reader support (#10221)
    
    Screen reader support is added for the `ui5-shellbar`
    
    * chore(ui5-shellbar): additional context event (#10172)
    
    Co-authored-by: PetyaMarkovaBogdanova <petya.markova@sap.com>
    
    * fix: responsive behaviour
    
    * fix: types
    
    * fix(ui5-shellbar): visual spec alignments (#10252)
    
    Co-authored-by: PetyaMarkovaBogdanova <petya.markova@sap.com>
    
    * fix(ui5-shellbar): space between search elements
    
    * fix(ui5-shellbar): tooltps fixed
    
    * shellbar laterst
    
    * chore: detach secondart title from branding
    
    * chore: remove cancable from disappears event
    
    * chore: wrappers
    
    * fix: additional-context-disappears fired whenever all items appear
    
    * chore: gap calulation refactor
    
    * chore: utilize getActiveElement
    
    * chore: rename event and ajdust since tags
    
    * chore: since tags
    
    * chore: remove s size handling of items
    
    * chore: adjust tests to removed s handling
    
    ---------
    
    Co-authored-by: PetyaMarkovaBogdanova <petya.markova@sap.com>
    Co-authored-by: yanaminkova <yana.minkova@sap.com>
    Co-authored-by: Dobrin Dimchev <dobrin.dimchev@sap.com>
    Co-authored-by: Konstantin Gogov <konstantin.gogov@sap.com>
    Co-authored-by: Plamen Ivanov <plamen.ivanov01@sap.com>
    Co-authored-by: yanaminkova <32466553+yanaminkova@users.noreply.github.com>
