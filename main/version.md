commit b1e6d5c539f6f17cd4d9433df13d53e122b9e29e
Author: Lukas Harbarth <lukas.harbarth@sap.com>
Date:   Mon Jan 23 17:45:11 2023 +0100

    docs: fix type annotation for `icon` slot (#6336)
    
    This PR changes the JSDoc annotation of the icon slot for the Badge, ComboBox and MultiComboBox component.
    
    For the Badge I changed it because the TypeScript type accepts an array of HTMLElements and not only a single element. For the ComboBox and the MultiComboBox I changed it because the type of the Input accepts an array as well and since (at least in my opinion) these components should behave in the same way, they should also accept an array.
