commit f6682b2d076df747e74058b0b156b3cf0627952d
Author: Stoyan <88034608+hinzzx@users.noreply.github.com>
Date:   Thu Feb 20 16:22:08 2025 +0200

    fix(ui5-menu): prevent global line-height inheritance (#10916)
    
    Previously setting a `line-height` property on global level e.g `body { line-height: 0.5rem }` was being inherited by the `ui5-menu` and its `ui5-menu-item`'s which was not convenient.
    
    With this chnange we now prevent the global inheritance of the `line-height` with the following priority:
    
    `ui5-menu-item` > `ui5-menu` > `global (globally no longer takes effect)`, which means if a `line-height` is set to the `ui5-menu`, all of its children (ui5-menu-items) would receive the effect, but if a specific `ui5-menu-item` receives the property, it would take over.
    
    For example, here all children, except the first one (which has explicitly set `style="line-height: 0.5rem;"`) would have `line-height` of `1rem`
    ```ts
            <ui5-menu style="line-height: 1rem;" header-text="Basic Menu with Items" id="menuBasic" opener="btnOpenBasic">
                    <ui5-menu-item style="line-height: 0.5rem;" text="New File" icon="add-document"></ui5-menu-item>
                    <ui5-menu-item text="New Folder" icon="add-folder" disabled></ui5-menu-item>
                    <ui5-menu-item text="Save" icon="add-folder" disabled></ui5-menu-item>
            </ui5-menu>
    ```
