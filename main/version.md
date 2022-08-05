commit ce17ca559ce507b8e10f20d7f80dab48908a8305
Author: ilhan orhan <ilhan.myumyun@sap.com>
Date:   Fri Aug 5 10:01:46 2022 +0300

    feat(ui5-icon): support SVGs with multiple paths  (#5630)
    
    Background:
    We received several questions on how to use custom icon collections as the built-in standard icons within UI5 Web Components APIs. From one hand side, we used to lack proper documentation on the matter, but also we are restrictive on the SVG type - the Icon web component can display an SVG with a single path only.
    Changes:
    enhance the Icon web component to support multiple paths SVGs
    document how one can register a custom icon collection
    
    FIXES: #5347
    Partially Addresses: #5526
