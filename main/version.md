commit 25cca0fe37dbe369a8d14b6aedacb120cbbe73fd
Author: ilhan orhan <ilhan.myumyun@sap.com>
Date:   Fri Feb 10 10:58:47 2023 +0200

    chore: change snapshot npm tag to @experimental (#6430)
    
    Prior to this change the snapshot releases (0.0.0-{commit_id}), triggered via the Release Snapshot action used to be published as "@next" tag. Recently we setup weekly auto releases - RC versions, such as 1.10.3-rc.0, 1.11.0-rc.0, etc. to also be published as "@next" versions, the versions look weird and mixed up.
    Now, we start publishing those types of versions as two different tags - 1.11.0-rc.0 as "@next" and "0.0.0-dae342da" as "@experimental"
