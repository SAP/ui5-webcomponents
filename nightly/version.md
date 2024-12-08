commit 84cf7b2bbdc7eff3c969dff27ff7c4be8ad359a3
Author: Tsanislav Gatev <tsanislav.gatev@sap.com>
Date:   Fri Dec 6 14:36:37 2024 +0200

    feat(ui5-step-input): add input event (#10294)
    
    We're proxying the Input event from the ui5-input. We're providing same details and keeping the preventable and bubling behaviour.
    
    fixes: #5177
