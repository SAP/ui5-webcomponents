import{y as o}from"./lit-html.9e2e9691.js";import{D as d}from"./docs.9716d2dc.js";import"./index.766d49cf.js";import"./iframe.8d816ebf.js";import"../sb-preview/runtime.mjs";import"./_commonjsHelpers.b8add541.js";import"./index.5ca63ce8.js";import"./_getTag.ec397a63.js";import"./index.bc622db0.js";import"./index.b38f6aa4.js";import"./chunk-MA2MUXQN.2cfeaebe.js";import"./chunk-R4NKYYJA.15989c7a.js";const p={default:{control:{type:"text"}}},c={package:"@ui5/webcomponents-fiori",since:"1.0.0-rc.10"};var t=Object.freeze,m=Object.defineProperty,g=(i,r)=>t(m(i,"raw",{value:t(r||i.slice())})),n;const l="ui5-wizard",A={title:"Fiori/Wizard",component:l,subcomponents:{WizardStep:"ui5-wizard-step"},parameters:{docs:{page:d({...c,component:l})}},argTypes:p},e=()=>o(n||(n=g([`
<h3>Wizard</h3>
    <div class="snippet">
        <ui5-wizard id="wiz">
            <ui5-wizard-step icon="product" title-text="Product type" selected="">
                <div style="display: flex; min-height: 200px; flex-direction: column;">
                    <ui5-title>1. Product Type</ui5-title><br/>
                    <ui5-message-strip>
                        The Wizard control is supposed to break down large tasks, into smaller steps, easier for the user to work with.
                    </ui5-message-strip><br/>
                    <ui5-label wrapping-type="Normal">Sed fermentum, mi et tristique ullamcorper, sapien sapien faucibus sem, quis pretium nibh lorem malesuada diam. Nulla quis arcu aliquet, feugiat massa semper, volutpat diam. Nam vitae ante posuere, molestie neque sit amet, dapibus velit. Maecenas eleifend tempor lorem. Mauris vitae elementum mi, sed eleifend ligula. Nulla tempor vulputate dolor, nec dignissim quam convallis ut. Praesent vitae commodo felis, ut iaculis felis. Fusce quis eleifend sapien, eget facilisis nibh. Suspendisse est velit, scelerisque ut commodo eget, dignissim quis metus. Cras faucibus consequat gravida. Curabitur vitae quam felis. Phasellus ac leo eleifend, commodo tortor et, varius quam. Aliquam erat volutpat.
                    </ui5-label>
                </div>
                <ui5-button id="toStep2" design="Emphasized">Step 2</ui5-button>
            </ui5-wizard-step>
            <ui5-wizard-step icon="hint" title-text="Product Information" disabled="">
                <div style="display: flex;flex-direction: column">
                    <ui5-title>2. Product Information</ui5-title><br/>
                    <ui5-label wrapping-type="Normal">
                        Integer pellentesque leo sit amet dui vehicula, quis ullamcorper est pulvinar. Nam in libero sem. Suspendisse arcu metus, molestie a turpis a, molestie aliquet dui. Donec ppellentesque leo sit amet dui vehicula, quis ullamcorper est pulvinar. Nam in libero sem. Suspendisse arcu metus, molestie a turpis a, molestie aliquet dui. Donec pulvinar, sapien corper eu, posuere malesuada nisl. Integer pellentesque leo sit amet dui vehicula, quis ullamcorper est pulvinar. Nam in libero sem. Suspendisse arcu metus, molestie a turpis a, molestie aliquet dui. Donec pulvinar, sapien
                    </ui5-label>
                    <div style="display: flex; flex-direction: column;">
                        <div style="display: flex; flex-direction: row; justify-content: flex-end; align-items: center; margin-top: 1rem">
                            <ui5-label>Name</ui5-label>
                            <ui5-input placeholder="product name..."></ui5-input>
                        </div>
                        <div style="display: flex; flex-direction: row; margin-top: 1rem; justify-content: flex-end; align-items: center;">
                            <ui5-label>Weight</ui5-label>
                            <ui5-input value="3.65"></ui5-input>
                        </div>
                        <div style="display: flex; flex-direction: row; margin-top: 1rem; justify-content: flex-end; align-items: center;">
                            <ui5-label>Manifacturer</ui5-label>
                            <ui5-select>
                                <ui5-option selected="">Apple</ui5-option>
                                <ui5-option>Samsung</ui5-option>
                                <ui5-option>Huawei</ui5-option>
                            </ui5-select>
                        </div>
                        <div style="display: flex; flex-direction: row; margin-top: 1rem; justify-content: flex-end; align-items: center;">
                            <ui5-label>5 years guarantee included</ui5-label>
                            <ui5-switch id="sw"></ui5-switch>
                        </div>
                    </div>
                </div>
                <ui5-button id="toStep3" design="Emphasized" hidden="">Step 3</ui5-button>
            </ui5-wizard-step>
            <ui5-wizard-step icon="action-settings" title-text="Options" disabled="">
                <div style="display: flex; flex-direction: column;">
                    <ui5-title>3. Options</ui5-title><br/>
                    <ui5-label wrapping-type="Normal">
                        Integer pellentesque leo sit amet dui vehicula, quis ullamcorper est pulvinar. Nam in libero sem. Suspendisse arcu metus, molestie a turpis a, molestie aliquet dui. Donec ppellentesque leo sit amet dui vehicula, quis ullamcorper est pulvinar. Nam in libero sem. Suspendisse arcu metus, molestie a turpis a, molestie aliquet dui. Donec pulvinar, sapien corper eu, posuere malesuada nisl. Integer pellentesque leo sit amet dui vehicula, quis ullamcorper est pulvinar. Nam in libero sem. Suspendisse arcu metus, molestie a turpis a, molestie aliquet dui. Donec pulvinar, sapien
                    </ui5-label>
                    <ui5-message-strip>
                        The Wizard control is supposed to break down large tasks, into smaller steps, easier for the user to work with.
                    </ui5-message-strip><br/>
                    <div style="display: flex; flex-direction: column;">
                        <div style="display: flex; flex-direction: row; justify-content: flex-end; align-items: center; margin-top: 1rem">
                            <ui5-label>Manifacture date</ui5-label>
                            <ui5-date-picker></ui5-date-picker>
                        </div>
                        <div style="display: flex; flex-direction: row; justify-content: flex-end; align-items: center; margin-top: 1rem">
                            <ui5-label>Availability</ui5-label>
                            <ui5-segmented-button id="segButton1">
                                <ui5-toggle-button icon="employee" pressed="">In stock</ui5-toggle-button>
                                <ui5-toggle-button>In depot</ui5-toggle-button>
                                <ui5-toggle-button>Damaged</ui5-toggle-button>
                                <ui5-toggle-button>Out of stock</ui5-toggle-button>
                            </ui5-segmented-button>
                        </div>
                        <div style="display: flex; flex-direction: row; justify-content: flex-end; align-items: center; margin-top: 1rem">
                            <ui5-label>Size</ui5-label>
                            <ui5-segmented-button id="sb">
                                <ui5-toggle-button icon="employee" pressed="">Small</ui5-toggle-button>
                                <ui5-toggle-button>Medium</ui5-toggle-button>
                                <ui5-toggle-button>Large</ui5-toggle-button>
                            </ui5-segmented-button>
                        </div>
                    </div>
                </div>
                <ui5-button id="toStep4" design="Emphasized" hidden="">Step 4</ui5-button>
            </ui5-wizard-step>
            <ui5-wizard-step icon="lead" title-text="Pricing" disabled="">
                <div style="display: flex; flex-direction: column;">
                    <ui5-title>4. Pricing</ui5-title><br/>
                    <ui5-label wrapping-type="Normal">
                        Integer pellentesque leo sit amet dui vehicula, quis ullamcorper est pulvinar. Nam in libero sem. Suspendisse arcu metus, molestie a turpis a, molestie aliquet dui. Donec ppellentesque leo sit amet dui vehicula, quis ullamcorper est pulvinar. Nam in libero sem. Suspendisse arcu metus, molestie a turpis a, molestie aliquet dui. Donec pulvinar, sapien corper eu, posuere malesuada nisl. Integer pellentesque leo sit amet dui vehicula, quis ullamcorper est pulvinar. Nam in libero sem. Suspendisse arcu metus, molestie a turpis a, molestie aliquet dui. Donec pulvinar, sapien
                    </ui5-label>
                    <ui5-message-strip>
                        The Wizard control is supposed to break down large tasks, into smaller steps, easier for the user to work with.
                    </ui5-message-strip><br/>
                    <div style="display: flex; flex-direction: column;">
                        <div style="display: flex; flex-direction: row; justify-content: flex-end; align-items: center; margin-top: 1rem">
                            <ui5-label>Price</ui5-label>
                            <ui5-input placeholder="product price..."></ui5-input>
                        </div>
                        <div style="display: flex; flex-direction: row; justify-content: flex-end; align-items: center; margin-top: 1rem">
                            <ui5-label>Quantity</ui5-label>
                            <ui5-input placeholder="product quantity..."></ui5-input>
                        </div>
                        <div style="display: flex; flex-direction: row; margin-top: 1rem; justify-content: flex-end; align-items: center;">
                            <ui5-label>Vat included</ui5-label>
                            <ui5-switch checked=""></ui5-switch>
                        </div>
                    </div>
                </div>
                <ui5-button id="finalize" design="Emphasized">Finalize</ui5-button>
            </ui5-wizard-step>
        </ui5-wizard>
    </div>
    <script>
        var wiz = document.getElementById("wiz");
        wiz.addEventListener("step-change", function () {
            console.log(event.detail.step);
        });
        sw.addEventListener("change", function () {
            toStep3.removeAttribute("hidden");
        });
        sb.addEventListener("selection-change", function () {
            toStep4.removeAttribute("hidden");
        });
        toStep2.addEventListener("click", function () {
            deselectAll(wiz);
            setStep(wiz, 1);
            toStep2.setAttribute("hidden", true);
        });
        toStep3.addEventListener("click", function () {
            deselectAll(wiz);
            setStep(wiz, 2);
            toStep3.setAttribute("hidden", true);
        });
        toStep4.addEventListener("click", function () {
            deselectAll(wiz);
            setStep(wiz, 3);
            toStep4.setAttribute("hidden", true);
        });
        finalize.addEventListener("click", function () {
            alert("Finalize");
        });
        function deselectAll(wizard) {
            Array.from(wizard.children).forEach(function(step) {
                step.selected = false;
            });
        }
        function setStep(wizard, idx) {
            var step = getStep(wizard, idx);
            step.selected = true;
            step.disabled = false;
        }
        function getStep(wizard, idx) {
            return Array.from(wizard.children)[idx];
        }
    <\/script>
`])));e.parameters={docs:{story:{inline:!1}}};var s,u,a;e.parameters={...e.parameters,docs:{...(s=e.parameters)==null?void 0:s.docs,source:{originalSource:`() => html\`
<h3>Wizard</h3>
    <div class="snippet">
        <ui5-wizard id="wiz">
            <ui5-wizard-step icon="product" title-text="Product type" selected="">
                <div style="display: flex; min-height: 200px; flex-direction: column;">
                    <ui5-title>1. Product Type</ui5-title><br/>
                    <ui5-message-strip>
                        The Wizard control is supposed to break down large tasks, into smaller steps, easier for the user to work with.
                    </ui5-message-strip><br/>
                    <ui5-label wrapping-type="Normal">Sed fermentum, mi et tristique ullamcorper, sapien sapien faucibus sem, quis pretium nibh lorem malesuada diam. Nulla quis arcu aliquet, feugiat massa semper, volutpat diam. Nam vitae ante posuere, molestie neque sit amet, dapibus velit. Maecenas eleifend tempor lorem. Mauris vitae elementum mi, sed eleifend ligula. Nulla tempor vulputate dolor, nec dignissim quam convallis ut. Praesent vitae commodo felis, ut iaculis felis. Fusce quis eleifend sapien, eget facilisis nibh. Suspendisse est velit, scelerisque ut commodo eget, dignissim quis metus. Cras faucibus consequat gravida. Curabitur vitae quam felis. Phasellus ac leo eleifend, commodo tortor et, varius quam. Aliquam erat volutpat.
                    </ui5-label>
                </div>
                <ui5-button id="toStep2" design="Emphasized">Step 2</ui5-button>
            </ui5-wizard-step>
            <ui5-wizard-step icon="hint" title-text="Product Information" disabled="">
                <div style="display: flex;flex-direction: column">
                    <ui5-title>2. Product Information</ui5-title><br/>
                    <ui5-label wrapping-type="Normal">
                        Integer pellentesque leo sit amet dui vehicula, quis ullamcorper est pulvinar. Nam in libero sem. Suspendisse arcu metus, molestie a turpis a, molestie aliquet dui. Donec ppellentesque leo sit amet dui vehicula, quis ullamcorper est pulvinar. Nam in libero sem. Suspendisse arcu metus, molestie a turpis a, molestie aliquet dui. Donec pulvinar, sapien corper eu, posuere malesuada nisl. Integer pellentesque leo sit amet dui vehicula, quis ullamcorper est pulvinar. Nam in libero sem. Suspendisse arcu metus, molestie a turpis a, molestie aliquet dui. Donec pulvinar, sapien
                    </ui5-label>
                    <div style="display: flex; flex-direction: column;">
                        <div style="display: flex; flex-direction: row; justify-content: flex-end; align-items: center; margin-top: 1rem">
                            <ui5-label>Name</ui5-label>
                            <ui5-input placeholder="product name..."></ui5-input>
                        </div>
                        <div style="display: flex; flex-direction: row; margin-top: 1rem; justify-content: flex-end; align-items: center;">
                            <ui5-label>Weight</ui5-label>
                            <ui5-input value="3.65"></ui5-input>
                        </div>
                        <div style="display: flex; flex-direction: row; margin-top: 1rem; justify-content: flex-end; align-items: center;">
                            <ui5-label>Manifacturer</ui5-label>
                            <ui5-select>
                                <ui5-option selected="">Apple</ui5-option>
                                <ui5-option>Samsung</ui5-option>
                                <ui5-option>Huawei</ui5-option>
                            </ui5-select>
                        </div>
                        <div style="display: flex; flex-direction: row; margin-top: 1rem; justify-content: flex-end; align-items: center;">
                            <ui5-label>5 years guarantee included</ui5-label>
                            <ui5-switch id="sw"></ui5-switch>
                        </div>
                    </div>
                </div>
                <ui5-button id="toStep3" design="Emphasized" hidden="">Step 3</ui5-button>
            </ui5-wizard-step>
            <ui5-wizard-step icon="action-settings" title-text="Options" disabled="">
                <div style="display: flex; flex-direction: column;">
                    <ui5-title>3. Options</ui5-title><br/>
                    <ui5-label wrapping-type="Normal">
                        Integer pellentesque leo sit amet dui vehicula, quis ullamcorper est pulvinar. Nam in libero sem. Suspendisse arcu metus, molestie a turpis a, molestie aliquet dui. Donec ppellentesque leo sit amet dui vehicula, quis ullamcorper est pulvinar. Nam in libero sem. Suspendisse arcu metus, molestie a turpis a, molestie aliquet dui. Donec pulvinar, sapien corper eu, posuere malesuada nisl. Integer pellentesque leo sit amet dui vehicula, quis ullamcorper est pulvinar. Nam in libero sem. Suspendisse arcu metus, molestie a turpis a, molestie aliquet dui. Donec pulvinar, sapien
                    </ui5-label>
                    <ui5-message-strip>
                        The Wizard control is supposed to break down large tasks, into smaller steps, easier for the user to work with.
                    </ui5-message-strip><br/>
                    <div style="display: flex; flex-direction: column;">
                        <div style="display: flex; flex-direction: row; justify-content: flex-end; align-items: center; margin-top: 1rem">
                            <ui5-label>Manifacture date</ui5-label>
                            <ui5-date-picker></ui5-date-picker>
                        </div>
                        <div style="display: flex; flex-direction: row; justify-content: flex-end; align-items: center; margin-top: 1rem">
                            <ui5-label>Availability</ui5-label>
                            <ui5-segmented-button id="segButton1">
                                <ui5-toggle-button icon="employee" pressed="">In stock</ui5-toggle-button>
                                <ui5-toggle-button>In depot</ui5-toggle-button>
                                <ui5-toggle-button>Damaged</ui5-toggle-button>
                                <ui5-toggle-button>Out of stock</ui5-toggle-button>
                            </ui5-segmented-button>
                        </div>
                        <div style="display: flex; flex-direction: row; justify-content: flex-end; align-items: center; margin-top: 1rem">
                            <ui5-label>Size</ui5-label>
                            <ui5-segmented-button id="sb">
                                <ui5-toggle-button icon="employee" pressed="">Small</ui5-toggle-button>
                                <ui5-toggle-button>Medium</ui5-toggle-button>
                                <ui5-toggle-button>Large</ui5-toggle-button>
                            </ui5-segmented-button>
                        </div>
                    </div>
                </div>
                <ui5-button id="toStep4" design="Emphasized" hidden="">Step 4</ui5-button>
            </ui5-wizard-step>
            <ui5-wizard-step icon="lead" title-text="Pricing" disabled="">
                <div style="display: flex; flex-direction: column;">
                    <ui5-title>4. Pricing</ui5-title><br/>
                    <ui5-label wrapping-type="Normal">
                        Integer pellentesque leo sit amet dui vehicula, quis ullamcorper est pulvinar. Nam in libero sem. Suspendisse arcu metus, molestie a turpis a, molestie aliquet dui. Donec ppellentesque leo sit amet dui vehicula, quis ullamcorper est pulvinar. Nam in libero sem. Suspendisse arcu metus, molestie a turpis a, molestie aliquet dui. Donec pulvinar, sapien corper eu, posuere malesuada nisl. Integer pellentesque leo sit amet dui vehicula, quis ullamcorper est pulvinar. Nam in libero sem. Suspendisse arcu metus, molestie a turpis a, molestie aliquet dui. Donec pulvinar, sapien
                    </ui5-label>
                    <ui5-message-strip>
                        The Wizard control is supposed to break down large tasks, into smaller steps, easier for the user to work with.
                    </ui5-message-strip><br/>
                    <div style="display: flex; flex-direction: column;">
                        <div style="display: flex; flex-direction: row; justify-content: flex-end; align-items: center; margin-top: 1rem">
                            <ui5-label>Price</ui5-label>
                            <ui5-input placeholder="product price..."></ui5-input>
                        </div>
                        <div style="display: flex; flex-direction: row; justify-content: flex-end; align-items: center; margin-top: 1rem">
                            <ui5-label>Quantity</ui5-label>
                            <ui5-input placeholder="product quantity..."></ui5-input>
                        </div>
                        <div style="display: flex; flex-direction: row; margin-top: 1rem; justify-content: flex-end; align-items: center;">
                            <ui5-label>Vat included</ui5-label>
                            <ui5-switch checked=""></ui5-switch>
                        </div>
                    </div>
                </div>
                <ui5-button id="finalize" design="Emphasized">Finalize</ui5-button>
            </ui5-wizard-step>
        </ui5-wizard>
    </div>
    <script>
        var wiz = document.getElementById("wiz");
        wiz.addEventListener("step-change", function () {
            console.log(event.detail.step);
        });
        sw.addEventListener("change", function () {
            toStep3.removeAttribute("hidden");
        });
        sb.addEventListener("selection-change", function () {
            toStep4.removeAttribute("hidden");
        });
        toStep2.addEventListener("click", function () {
            deselectAll(wiz);
            setStep(wiz, 1);
            toStep2.setAttribute("hidden", true);
        });
        toStep3.addEventListener("click", function () {
            deselectAll(wiz);
            setStep(wiz, 2);
            toStep3.setAttribute("hidden", true);
        });
        toStep4.addEventListener("click", function () {
            deselectAll(wiz);
            setStep(wiz, 3);
            toStep4.setAttribute("hidden", true);
        });
        finalize.addEventListener("click", function () {
            alert("Finalize");
        });
        function deselectAll(wizard) {
            Array.from(wizard.children).forEach(function(step) {
                step.selected = false;
            });
        }
        function setStep(wizard, idx) {
            var step = getStep(wizard, idx);
            step.selected = true;
            step.disabled = false;
        }
        function getStep(wizard, idx) {
            return Array.from(wizard.children)[idx];
        }
    <\/script>
\``,...(a=(u=e.parameters)==null?void 0:u.docs)==null?void 0:a.source}}};const E=["Template0"];export{e as Template0,E as __namedExportsOrder,A as default};
//# sourceMappingURL=Wizard.stories.e6c3f080.js.map
