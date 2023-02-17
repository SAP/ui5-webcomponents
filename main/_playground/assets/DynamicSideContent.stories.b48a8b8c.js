import{y as e}from"./lit-html.9e2e9691.js";import{D as F}from"./docs.7a9434d6.js";import"./index.8cb7a9d9.js";import"./iframe.d5a3589f.js";import"../sb-preview/runtime.mjs";import"./_commonjsHelpers.b8add541.js";import"./index.5ca63ce8.js";import"./_getTag.ec397a63.js";import"./index.bc622db0.js";import"./index.b38f6aa4.js";import"./chunk-MA2MUXQN.8974bf6a.js";import"./chunk-R4NKYYJA.15989c7a.js";const X={sideContentFallDown:{control:"select",options:["BelowL","BelowM","BelowXL","OnMinimumWidth"]},sideContentPosition:{control:"select",options:["End","Start"]},sideContentVisibility:{control:"select",options:["AlwaysShow","NeverShow","ShowAboveL","ShowAboveM","ShowAboveS"]},default:{control:{type:"text"}},sideContent:{control:{type:"text"}},toggleContents:{table:{category:"Methods"}}},z={package:"@ui5/webcomponents-fiori",since:"1.1.0"};var m=Object.freeze,O=Object.defineProperty,j=(l,_)=>m(O(l,"raw",{value:m(_||l.slice())})),d;const c="ui5-dynamic-side-content",ie={title:"Fiori/DynamicSideContent",component:c,parameters:{docs:{page:F({...z,component:c})}},argTypes:X},t=()=>e`
<h3>Dynamic Side Content with default properties</h3>
    <div class="snippet">
        <div class="wrapper100">
            <ui5-page>
                <ui5-dynamic-side-content class="content-padding">
                    <div>
                        <h1>Main Content</h1>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ex mi, elementum et ante commodo, semper sollicitudin magna. Sed dapibus ut tortor quis varius. Sed luctus sem at nunc porta vulputate. Suspendisse lobortis arcu est, quis ultrices ipsum fermentum a. Vestibulum a ipsum placerat ligula gravida fringilla at id ex. Etiam pellentesque lorem sed sagittis aliquam. Quisque semper orci risus, vel efficitur dui euismod aliquet. Morbi sapien sapien, rhoncus et rutrum nec, rhoncus id nisl. Cras non tincidunt enim, id eleifend neque.</p>
                    </div>
                    <div slot="sideContent">
                        <h1>Side Content</h1>
                        <p>Morbi lorem libero, imperdiet id condimentum ac, tempor ut velit. Integer a laoreet sem. Nunc at sagittis nisi. Sed placerat diam eu porttitor dignissim. Maecenas nec fringilla tortor. Pellentesque ut elit est. Curabitur quis elit at mauris ullamcorper fringilla. Nullam diam mi, porttitor dictum orci nec, molestie luctus metus. Nunc ut ex blandit, elementum erat eget, pulvinar sapien. Donec nec lorem eu nunc eleifend tempor at non tortor. In quam velit, ornare at rutrum ac, porta ac augue. Suspendisse venenatis semper lacus at venenatis. Praesent vestibulum ligula nulla, at tempus lorem consequat suscipit. Aenean consequat dapibus dui, at bibendum mauris porta a.</p>
                    </div>
                </ui5-dynamic-side-content>
            </ui5-page>
        </div>
    </div>
`,n=()=>e`
<h3>Dynamic Side Content with hideMainContent set</h3>
    <div class="snippet">
        <div class="wrapper100">
            <ui5-page>
                <ui5-dynamic-side-content hide-main-content="" class="content-padding">
                    <div>
                        <h1>Main Content</h1>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ex mi, elementum et ante commodo, semper sollicitudin magna. Sed dapibus ut tortor quis varius. Sed luctus sem at nunc porta vulputate. Suspendisse lobortis arcu est, quis ultrices ipsum fermentum a. Vestibulum a ipsum placerat ligula gravida fringilla at id ex. Etiam pellentesque lorem sed sagittis aliquam. Quisque semper orci risus, vel efficitur dui euismod aliquet. Morbi sapien sapien, rhoncus et rutrum nec, rhoncus id nisl. Cras non tincidunt enim, id eleifend neque.</p>
                    </div>
                    <div slot="sideContent">
                        <h1>Side Content</h1>
                        <p>Morbi lorem libero, imperdiet id condimentum ac, tempor ut velit. Integer a laoreet sem. Nunc at sagittis nisi. Sed placerat diam eu porttitor dignissim. Maecenas nec fringilla tortor. Pellentesque ut elit est. Curabitur quis elit at mauris ullamcorper fringilla. Nullam diam mi, porttitor dictum orci nec, molestie luctus metus. Nunc ut ex blandit, elementum erat eget, pulvinar sapien. Donec nec lorem eu nunc eleifend tempor at non tortor. In quam velit, ornare at rutrum ac, porta ac augue. Suspendisse venenatis semper lacus at venenatis. Praesent vestibulum ligula nulla, at tempus lorem consequat suscipit. Aenean consequat dapibus dui, at bibendum mauris porta a.</p>
                    </div>
                </ui5-dynamic-side-content>
            </ui5-page>
        </div>
    </div>
`,a=()=>e`
<h3>Dynamic Side Content with hideSideContent set</h3>
    <div class="snippet">
        <div class="wrapper100">
            <ui5-page>
                <ui5-dynamic-side-content hide-side-content="" class="content-padding">
                    <div>
                        <h1>Main Content</h1>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ex mi, elementum et ante commodo, semper sollicitudin magna. Sed dapibus ut tortor quis varius. Sed luctus sem at nunc porta vulputate. Suspendisse lobortis arcu est, quis ultrices ipsum fermentum a. Vestibulum a ipsum placerat ligula gravida fringilla at id ex. Etiam pellentesque lorem sed sagittis aliquam. Quisque semper orci risus, vel efficitur dui euismod aliquet. Morbi sapien sapien, rhoncus et rutrum nec, rhoncus id nisl. Cras non tincidunt enim, id eleifend neque.</p>
                    </div>
                    <div slot="sideContent">
                        <h1>Side Content</h1>
                        <p>Morbi lorem libero, imperdiet id condimentum ac, tempor ut velit. Integer a laoreet sem. Nunc at sagittis nisi. Sed placerat diam eu porttitor dignissim. Maecenas nec fringilla tortor. Pellentesque ut elit est. Curabitur quis elit at mauris ullamcorper fringilla. Nullam diam mi, porttitor dictum orci nec, molestie luctus metus. Nunc ut ex blandit, elementum erat eget, pulvinar sapien. Donec nec lorem eu nunc eleifend tempor at non tortor. In quam velit, ornare at rutrum ac, porta ac augue. Suspendisse venenatis semper lacus at venenatis. Praesent vestibulum ligula nulla, at tempus lorem consequat suscipit. Aenean consequat dapibus dui, at bibendum mauris porta a.</p>
                    </div>
                </ui5-dynamic-side-content>
            </ui5-page>
        </div>
    </div>
`,s=()=>e`
<h3>Dynamic Side Content with equalSplit set</h3>
    <div class="snippet">
        <div class="wrapper100">
            <ui5-page>
                <ui5-dynamic-side-content equal-split="" class="content-padding">
                    <div>
                        <h1>Main Content</h1>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ex mi, elementum et ante commodo, semper sollicitudin magna. Sed dapibus ut tortor quis varius. Sed luctus sem at nunc porta vulputate. Suspendisse lobortis arcu est, quis ultrices ipsum fermentum a. Vestibulum a ipsum placerat ligula gravida fringilla at id ex. Etiam pellentesque lorem sed sagittis aliquam. Quisque semper orci risus, vel efficitur dui euismod aliquet. Morbi sapien sapien, rhoncus et rutrum nec, rhoncus id nisl. Cras non tincidunt enim, id eleifend neque.</p>
                    </div>
                    <div slot="sideContent">
                        <h1>Side Content</h1>
                        <p>Morbi lorem libero, imperdiet id condimentum ac, tempor ut velit. Integer a laoreet sem. Nunc at sagittis nisi. Sed placerat diam eu porttitor dignissim. Maecenas nec fringilla tortor. Pellentesque ut elit est. Curabitur quis elit at mauris ullamcorper fringilla. Nullam diam mi, porttitor dictum orci nec, molestie luctus metus. Nunc ut ex blandit, elementum erat eget, pulvinar sapien. Donec nec lorem eu nunc eleifend tempor at non tortor. In quam velit, ornare at rutrum ac, porta ac augue. Suspendisse venenatis semper lacus at venenatis. Praesent vestibulum ligula nulla, at tempus lorem consequat suscipit. Aenean consequat dapibus dui, at bibendum mauris porta a.</p>
                    </div>
                </ui5-dynamic-side-content>
            </ui5-page>
        </div>
    </div>
`,u=()=>e`
<h3>Dynamic Side Content with sideContentPosition="Start"</h3>
    <div class="snippet">
        <div class="wrapper100">
            <ui5-page>
                <ui5-dynamic-side-content side-content-position="Start" class="content-padding">
                    <div>
                        <h1>Main Content</h1>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ex mi, elementum et ante commodo, semper sollicitudin magna. Sed dapibus ut tortor quis varius. Sed luctus sem at nunc porta vulputate. Suspendisse lobortis arcu est, quis ultrices ipsum fermentum a. Vestibulum a ipsum placerat ligula gravida fringilla at id ex. Etiam pellentesque lorem sed sagittis aliquam. Quisque semper orci risus, vel efficitur dui euismod aliquet. Morbi sapien sapien, rhoncus et rutrum nec, rhoncus id nisl. Cras non tincidunt enim, id eleifend neque.</p>
                    </div>
                    <div slot="sideContent">
                        <h1>Side Content</h1>
                        <p>Morbi lorem libero, imperdiet id condimentum ac, tempor ut velit. Integer a laoreet sem. Nunc at sagittis nisi. Sed placerat diam eu porttitor dignissim. Maecenas nec fringilla tortor. Pellentesque ut elit est. Curabitur quis elit at mauris ullamcorper fringilla. Nullam diam mi, porttitor dictum orci nec, molestie luctus metus. Nunc ut ex blandit, elementum erat eget, pulvinar sapien. Donec nec lorem eu nunc eleifend tempor at non tortor. In quam velit, ornare at rutrum ac, porta ac augue. Suspendisse venenatis semper lacus at venenatis. Praesent vestibulum ligula nulla, at tempus lorem consequat suscipit. Aenean consequat dapibus dui, at bibendum mauris porta a.</p>
                    </div>
                </ui5-dynamic-side-content>
            </ui5-page>
        </div>
    </div>
`,r=()=>e`
<h3>Dynamic Side Content with sideContentFallDown="BelowXL"</h3>
    <div class="snippet">
        <div class="wrapper100">
            <ui5-page>
                <ui5-dynamic-side-content side-content-fall-down="BelowXL" class="content-padding">
                    <div>
                        <h1>Main Content</h1>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ex mi, elementum et ante commodo, semper sollicitudin magna. Sed dapibus ut tortor quis varius. Sed luctus sem at nunc porta vulputate. Suspendisse lobortis arcu est, quis ultrices ipsum fermentum a. Vestibulum a ipsum placerat ligula gravida fringilla at id ex. Etiam pellentesque lorem sed sagittis aliquam. Quisque semper orci risus, vel efficitur dui euismod aliquet. Morbi sapien sapien, rhoncus et rutrum nec, rhoncus id nisl. Cras non tincidunt enim, id eleifend neque.</p>
                    </div>
                    <div slot="sideContent">
                        <h1>Side Content</h1>
                        <p>Morbi lorem libero, imperdiet id condimentum ac, tempor ut velit. Integer a laoreet sem. Nunc at sagittis nisi. Sed placerat diam eu porttitor dignissim. Maecenas nec fringilla tortor. Pellentesque ut elit est. Curabitur quis elit at mauris ullamcorper fringilla. Nullam diam mi, porttitor dictum orci nec, molestie luctus metus. Nunc ut ex blandit, elementum erat eget, pulvinar sapien. Donec nec lorem eu nunc eleifend tempor at non tortor. In quam velit, ornare at rutrum ac, porta ac augue. Suspendisse venenatis semper lacus at venenatis. Praesent vestibulum ligula nulla, at tempus lorem consequat suscipit. Aenean consequat dapibus dui, at bibendum mauris porta a.</p>
                    </div>
                </ui5-dynamic-side-content>
            </ui5-page>
        </div>
    </div>
`,o=()=>e`
<h3>Dynamic Side Content with sideContentVisibility="ShowAboveM"</h3>
    <div class="snippet">
        <div class="wrapper100">
            <ui5-page>
                <ui5-dynamic-side-content side-content-visibility="ShowAboveM" class="content-padding">
                    <div>
                        <h1>Main Content</h1>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ex mi, elementum et ante commodo, semper sollicitudin magna. Sed dapibus ut tortor quis varius. Sed luctus sem at nunc porta vulputate. Suspendisse lobortis arcu est, quis ultrices ipsum fermentum a. Vestibulum a ipsum placerat ligula gravida fringilla at id ex. Etiam pellentesque lorem sed sagittis aliquam. Quisque semper orci risus, vel efficitur dui euismod aliquet. Morbi sapien sapien, rhoncus et rutrum nec, rhoncus id nisl. Cras non tincidunt enim, id eleifend neque.</p>
                    </div>
                    <div slot="sideContent">
                        <h1>Side Content</h1>
                        <p>Morbi lorem libero, imperdiet id condimentum ac, tempor ut velit. Integer a laoreet sem. Nunc at sagittis nisi. Sed placerat diam eu porttitor dignissim. Maecenas nec fringilla tortor. Pellentesque ut elit est. Curabitur quis elit at mauris ullamcorper fringilla. Nullam diam mi, porttitor dictum orci nec, molestie luctus metus. Nunc ut ex blandit, elementum erat eget, pulvinar sapien. Donec nec lorem eu nunc eleifend tempor at non tortor. In quam velit, ornare at rutrum ac, porta ac augue. Suspendisse venenatis semper lacus at venenatis. Praesent vestibulum ligula nulla, at tempus lorem consequat suscipit. Aenean consequat dapibus dui, at bibendum mauris porta a.</p>
                    </div>
                </ui5-dynamic-side-content>
            </ui5-page>
        </div>
    </div>
`,i=()=>e(d||(d=j([`
<h3>Dynamic Side Content - toggle contents on mobile device (S size)</h3>
    <div class="snippet">
        <div class="wrapperM">
            <ui5-page floating-footer="" show-footer="">
                <ui5-dynamic-side-content id="dynamicSideContent" class="content-padding">
                    <div>
                        <h1>Main Content</h1>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ex mi, elementum et ante commodo, semper sollicitudin magna. Sed dapibus ut tortor quis varius. Sed luctus sem at nunc porta vulputate. Suspendisse lobortis arcu est, quis ultrices ipsum fermentum a. Vestibulum a ipsum placerat ligula gravida fringilla at id ex. Etiam pellentesque lorem sed sagittis aliquam. Quisque semper orci risus, vel efficitur dui euismod aliquet. Morbi sapien sapien, rhoncus et rutrum nec, rhoncus id nisl. Cras non tincidunt enim, id eleifend neque.</p>
                    </div>
                    <div slot="sideContent">
                        <h1>Side Content</h1>
                        <p>Morbi lorem libero, imperdiet id condimentum ac, tempor ut velit. Integer a laoreet sem. Nunc at sagittis nisi. Sed placerat diam eu porttitor dignissim. Maecenas nec fringilla tortor. Pellentesque ut elit est. Curabitur quis elit at mauris ullamcorper fringilla. Nullam diam mi, porttitor dictum orci nec, molestie luctus metus. Nunc ut ex blandit, elementum erat eget, pulvinar sapien. Donec nec lorem eu nunc eleifend tempor at non tortor. In quam velit, ornare at rutrum ac, porta ac augue. Suspendisse venenatis semper lacus at venenatis. Praesent vestibulum ligula nulla, at tempus lorem consequat suscipit. Aenean consequat dapibus dui, at bibendum mauris porta a.</p>
                    </div>
                </ui5-dynamic-side-content>
                <div slot="footer">
                    <ui5-bar design="FloatingFooter">
                        <ui5-button id="toggleButton" design="Positive" slot="endContent">Toggle</ui5-button>
                    </ui5-bar>
                </div>
            </ui5-page>
        </div>
    </div>
    <script>
        toggleButton.addEventListener("click", function() {
            dynamicSideContent.toggleContents();
        });
    <\/script>
`])));i.parameters={docs:{story:{inline:!1}}};var p,g,v;t.parameters={...t.parameters,docs:{...(p=t.parameters)==null?void 0:p.docs,source:{originalSource:`() => html\`
<h3>Dynamic Side Content with default properties</h3>
    <div class="snippet">
        <div class="wrapper100">
            <ui5-page>
                <ui5-dynamic-side-content class="content-padding">
                    <div>
                        <h1>Main Content</h1>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ex mi, elementum et ante commodo, semper sollicitudin magna. Sed dapibus ut tortor quis varius. Sed luctus sem at nunc porta vulputate. Suspendisse lobortis arcu est, quis ultrices ipsum fermentum a. Vestibulum a ipsum placerat ligula gravida fringilla at id ex. Etiam pellentesque lorem sed sagittis aliquam. Quisque semper orci risus, vel efficitur dui euismod aliquet. Morbi sapien sapien, rhoncus et rutrum nec, rhoncus id nisl. Cras non tincidunt enim, id eleifend neque.</p>
                    </div>
                    <div slot="sideContent">
                        <h1>Side Content</h1>
                        <p>Morbi lorem libero, imperdiet id condimentum ac, tempor ut velit. Integer a laoreet sem. Nunc at sagittis nisi. Sed placerat diam eu porttitor dignissim. Maecenas nec fringilla tortor. Pellentesque ut elit est. Curabitur quis elit at mauris ullamcorper fringilla. Nullam diam mi, porttitor dictum orci nec, molestie luctus metus. Nunc ut ex blandit, elementum erat eget, pulvinar sapien. Donec nec lorem eu nunc eleifend tempor at non tortor. In quam velit, ornare at rutrum ac, porta ac augue. Suspendisse venenatis semper lacus at venenatis. Praesent vestibulum ligula nulla, at tempus lorem consequat suscipit. Aenean consequat dapibus dui, at bibendum mauris porta a.</p>
                    </div>
                </ui5-dynamic-side-content>
            </ui5-page>
        </div>
    </div>
\``,...(v=(g=t.parameters)==null?void 0:g.docs)==null?void 0:v.source}}};var b,q,h;n.parameters={...n.parameters,docs:{...(b=n.parameters)==null?void 0:b.docs,source:{originalSource:`() => html\`
<h3>Dynamic Side Content with hideMainContent set</h3>
    <div class="snippet">
        <div class="wrapper100">
            <ui5-page>
                <ui5-dynamic-side-content hide-main-content="" class="content-padding">
                    <div>
                        <h1>Main Content</h1>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ex mi, elementum et ante commodo, semper sollicitudin magna. Sed dapibus ut tortor quis varius. Sed luctus sem at nunc porta vulputate. Suspendisse lobortis arcu est, quis ultrices ipsum fermentum a. Vestibulum a ipsum placerat ligula gravida fringilla at id ex. Etiam pellentesque lorem sed sagittis aliquam. Quisque semper orci risus, vel efficitur dui euismod aliquet. Morbi sapien sapien, rhoncus et rutrum nec, rhoncus id nisl. Cras non tincidunt enim, id eleifend neque.</p>
                    </div>
                    <div slot="sideContent">
                        <h1>Side Content</h1>
                        <p>Morbi lorem libero, imperdiet id condimentum ac, tempor ut velit. Integer a laoreet sem. Nunc at sagittis nisi. Sed placerat diam eu porttitor dignissim. Maecenas nec fringilla tortor. Pellentesque ut elit est. Curabitur quis elit at mauris ullamcorper fringilla. Nullam diam mi, porttitor dictum orci nec, molestie luctus metus. Nunc ut ex blandit, elementum erat eget, pulvinar sapien. Donec nec lorem eu nunc eleifend tempor at non tortor. In quam velit, ornare at rutrum ac, porta ac augue. Suspendisse venenatis semper lacus at venenatis. Praesent vestibulum ligula nulla, at tempus lorem consequat suscipit. Aenean consequat dapibus dui, at bibendum mauris porta a.</p>
                    </div>
                </ui5-dynamic-side-content>
            </ui5-page>
        </div>
    </div>
\``,...(h=(q=n.parameters)==null?void 0:q.docs)==null?void 0:h.source}}};var f,S,C;a.parameters={...a.parameters,docs:{...(f=a.parameters)==null?void 0:f.docs,source:{originalSource:`() => html\`
<h3>Dynamic Side Content with hideSideContent set</h3>
    <div class="snippet">
        <div class="wrapper100">
            <ui5-page>
                <ui5-dynamic-side-content hide-side-content="" class="content-padding">
                    <div>
                        <h1>Main Content</h1>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ex mi, elementum et ante commodo, semper sollicitudin magna. Sed dapibus ut tortor quis varius. Sed luctus sem at nunc porta vulputate. Suspendisse lobortis arcu est, quis ultrices ipsum fermentum a. Vestibulum a ipsum placerat ligula gravida fringilla at id ex. Etiam pellentesque lorem sed sagittis aliquam. Quisque semper orci risus, vel efficitur dui euismod aliquet. Morbi sapien sapien, rhoncus et rutrum nec, rhoncus id nisl. Cras non tincidunt enim, id eleifend neque.</p>
                    </div>
                    <div slot="sideContent">
                        <h1>Side Content</h1>
                        <p>Morbi lorem libero, imperdiet id condimentum ac, tempor ut velit. Integer a laoreet sem. Nunc at sagittis nisi. Sed placerat diam eu porttitor dignissim. Maecenas nec fringilla tortor. Pellentesque ut elit est. Curabitur quis elit at mauris ullamcorper fringilla. Nullam diam mi, porttitor dictum orci nec, molestie luctus metus. Nunc ut ex blandit, elementum erat eget, pulvinar sapien. Donec nec lorem eu nunc eleifend tempor at non tortor. In quam velit, ornare at rutrum ac, porta ac augue. Suspendisse venenatis semper lacus at venenatis. Praesent vestibulum ligula nulla, at tempus lorem consequat suscipit. Aenean consequat dapibus dui, at bibendum mauris porta a.</p>
                    </div>
                </ui5-dynamic-side-content>
            </ui5-page>
        </div>
    </div>
\``,...(C=(S=a.parameters)==null?void 0:S.docs)==null?void 0:C.source}}};var M,y,N;s.parameters={...s.parameters,docs:{...(M=s.parameters)==null?void 0:M.docs,source:{originalSource:`() => html\`
<h3>Dynamic Side Content with equalSplit set</h3>
    <div class="snippet">
        <div class="wrapper100">
            <ui5-page>
                <ui5-dynamic-side-content equal-split="" class="content-padding">
                    <div>
                        <h1>Main Content</h1>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ex mi, elementum et ante commodo, semper sollicitudin magna. Sed dapibus ut tortor quis varius. Sed luctus sem at nunc porta vulputate. Suspendisse lobortis arcu est, quis ultrices ipsum fermentum a. Vestibulum a ipsum placerat ligula gravida fringilla at id ex. Etiam pellentesque lorem sed sagittis aliquam. Quisque semper orci risus, vel efficitur dui euismod aliquet. Morbi sapien sapien, rhoncus et rutrum nec, rhoncus id nisl. Cras non tincidunt enim, id eleifend neque.</p>
                    </div>
                    <div slot="sideContent">
                        <h1>Side Content</h1>
                        <p>Morbi lorem libero, imperdiet id condimentum ac, tempor ut velit. Integer a laoreet sem. Nunc at sagittis nisi. Sed placerat diam eu porttitor dignissim. Maecenas nec fringilla tortor. Pellentesque ut elit est. Curabitur quis elit at mauris ullamcorper fringilla. Nullam diam mi, porttitor dictum orci nec, molestie luctus metus. Nunc ut ex blandit, elementum erat eget, pulvinar sapien. Donec nec lorem eu nunc eleifend tempor at non tortor. In quam velit, ornare at rutrum ac, porta ac augue. Suspendisse venenatis semper lacus at venenatis. Praesent vestibulum ligula nulla, at tempus lorem consequat suscipit. Aenean consequat dapibus dui, at bibendum mauris porta a.</p>
                    </div>
                </ui5-dynamic-side-content>
            </ui5-page>
        </div>
    </div>
\``,...(N=(y=s.parameters)==null?void 0:y.docs)==null?void 0:N.source}}};var w,x,P;u.parameters={...u.parameters,docs:{...(w=u.parameters)==null?void 0:w.docs,source:{originalSource:`() => html\`
<h3>Dynamic Side Content with sideContentPosition="Start"</h3>
    <div class="snippet">
        <div class="wrapper100">
            <ui5-page>
                <ui5-dynamic-side-content side-content-position="Start" class="content-padding">
                    <div>
                        <h1>Main Content</h1>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ex mi, elementum et ante commodo, semper sollicitudin magna. Sed dapibus ut tortor quis varius. Sed luctus sem at nunc porta vulputate. Suspendisse lobortis arcu est, quis ultrices ipsum fermentum a. Vestibulum a ipsum placerat ligula gravida fringilla at id ex. Etiam pellentesque lorem sed sagittis aliquam. Quisque semper orci risus, vel efficitur dui euismod aliquet. Morbi sapien sapien, rhoncus et rutrum nec, rhoncus id nisl. Cras non tincidunt enim, id eleifend neque.</p>
                    </div>
                    <div slot="sideContent">
                        <h1>Side Content</h1>
                        <p>Morbi lorem libero, imperdiet id condimentum ac, tempor ut velit. Integer a laoreet sem. Nunc at sagittis nisi. Sed placerat diam eu porttitor dignissim. Maecenas nec fringilla tortor. Pellentesque ut elit est. Curabitur quis elit at mauris ullamcorper fringilla. Nullam diam mi, porttitor dictum orci nec, molestie luctus metus. Nunc ut ex blandit, elementum erat eget, pulvinar sapien. Donec nec lorem eu nunc eleifend tempor at non tortor. In quam velit, ornare at rutrum ac, porta ac augue. Suspendisse venenatis semper lacus at venenatis. Praesent vestibulum ligula nulla, at tempus lorem consequat suscipit. Aenean consequat dapibus dui, at bibendum mauris porta a.</p>
                    </div>
                </ui5-dynamic-side-content>
            </ui5-page>
        </div>
    </div>
\``,...(P=(x=u.parameters)==null?void 0:x.docs)==null?void 0:P.source}}};var D,I,L;r.parameters={...r.parameters,docs:{...(D=r.parameters)==null?void 0:D.docs,source:{originalSource:`() => html\`
<h3>Dynamic Side Content with sideContentFallDown="BelowXL"</h3>
    <div class="snippet">
        <div class="wrapper100">
            <ui5-page>
                <ui5-dynamic-side-content side-content-fall-down="BelowXL" class="content-padding">
                    <div>
                        <h1>Main Content</h1>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ex mi, elementum et ante commodo, semper sollicitudin magna. Sed dapibus ut tortor quis varius. Sed luctus sem at nunc porta vulputate. Suspendisse lobortis arcu est, quis ultrices ipsum fermentum a. Vestibulum a ipsum placerat ligula gravida fringilla at id ex. Etiam pellentesque lorem sed sagittis aliquam. Quisque semper orci risus, vel efficitur dui euismod aliquet. Morbi sapien sapien, rhoncus et rutrum nec, rhoncus id nisl. Cras non tincidunt enim, id eleifend neque.</p>
                    </div>
                    <div slot="sideContent">
                        <h1>Side Content</h1>
                        <p>Morbi lorem libero, imperdiet id condimentum ac, tempor ut velit. Integer a laoreet sem. Nunc at sagittis nisi. Sed placerat diam eu porttitor dignissim. Maecenas nec fringilla tortor. Pellentesque ut elit est. Curabitur quis elit at mauris ullamcorper fringilla. Nullam diam mi, porttitor dictum orci nec, molestie luctus metus. Nunc ut ex blandit, elementum erat eget, pulvinar sapien. Donec nec lorem eu nunc eleifend tempor at non tortor. In quam velit, ornare at rutrum ac, porta ac augue. Suspendisse venenatis semper lacus at venenatis. Praesent vestibulum ligula nulla, at tempus lorem consequat suscipit. Aenean consequat dapibus dui, at bibendum mauris porta a.</p>
                    </div>
                </ui5-dynamic-side-content>
            </ui5-page>
        </div>
    </div>
\``,...(L=(I=r.parameters)==null?void 0:I.docs)==null?void 0:L.source}}};var A,E,T;o.parameters={...o.parameters,docs:{...(A=o.parameters)==null?void 0:A.docs,source:{originalSource:`() => html\`
<h3>Dynamic Side Content with sideContentVisibility="ShowAboveM"</h3>
    <div class="snippet">
        <div class="wrapper100">
            <ui5-page>
                <ui5-dynamic-side-content side-content-visibility="ShowAboveM" class="content-padding">
                    <div>
                        <h1>Main Content</h1>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ex mi, elementum et ante commodo, semper sollicitudin magna. Sed dapibus ut tortor quis varius. Sed luctus sem at nunc porta vulputate. Suspendisse lobortis arcu est, quis ultrices ipsum fermentum a. Vestibulum a ipsum placerat ligula gravida fringilla at id ex. Etiam pellentesque lorem sed sagittis aliquam. Quisque semper orci risus, vel efficitur dui euismod aliquet. Morbi sapien sapien, rhoncus et rutrum nec, rhoncus id nisl. Cras non tincidunt enim, id eleifend neque.</p>
                    </div>
                    <div slot="sideContent">
                        <h1>Side Content</h1>
                        <p>Morbi lorem libero, imperdiet id condimentum ac, tempor ut velit. Integer a laoreet sem. Nunc at sagittis nisi. Sed placerat diam eu porttitor dignissim. Maecenas nec fringilla tortor. Pellentesque ut elit est. Curabitur quis elit at mauris ullamcorper fringilla. Nullam diam mi, porttitor dictum orci nec, molestie luctus metus. Nunc ut ex blandit, elementum erat eget, pulvinar sapien. Donec nec lorem eu nunc eleifend tempor at non tortor. In quam velit, ornare at rutrum ac, porta ac augue. Suspendisse venenatis semper lacus at venenatis. Praesent vestibulum ligula nulla, at tempus lorem consequat suscipit. Aenean consequat dapibus dui, at bibendum mauris porta a.</p>
                    </div>
                </ui5-dynamic-side-content>
            </ui5-page>
        </div>
    </div>
\``,...(T=(E=o.parameters)==null?void 0:E.docs)==null?void 0:T.source}}};var V,Q,B;i.parameters={...i.parameters,docs:{...(V=i.parameters)==null?void 0:V.docs,source:{originalSource:`() => html\`
<h3>Dynamic Side Content - toggle contents on mobile device (S size)</h3>
    <div class="snippet">
        <div class="wrapperM">
            <ui5-page floating-footer="" show-footer="">
                <ui5-dynamic-side-content id="dynamicSideContent" class="content-padding">
                    <div>
                        <h1>Main Content</h1>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ex mi, elementum et ante commodo, semper sollicitudin magna. Sed dapibus ut tortor quis varius. Sed luctus sem at nunc porta vulputate. Suspendisse lobortis arcu est, quis ultrices ipsum fermentum a. Vestibulum a ipsum placerat ligula gravida fringilla at id ex. Etiam pellentesque lorem sed sagittis aliquam. Quisque semper orci risus, vel efficitur dui euismod aliquet. Morbi sapien sapien, rhoncus et rutrum nec, rhoncus id nisl. Cras non tincidunt enim, id eleifend neque.</p>
                    </div>
                    <div slot="sideContent">
                        <h1>Side Content</h1>
                        <p>Morbi lorem libero, imperdiet id condimentum ac, tempor ut velit. Integer a laoreet sem. Nunc at sagittis nisi. Sed placerat diam eu porttitor dignissim. Maecenas nec fringilla tortor. Pellentesque ut elit est. Curabitur quis elit at mauris ullamcorper fringilla. Nullam diam mi, porttitor dictum orci nec, molestie luctus metus. Nunc ut ex blandit, elementum erat eget, pulvinar sapien. Donec nec lorem eu nunc eleifend tempor at non tortor. In quam velit, ornare at rutrum ac, porta ac augue. Suspendisse venenatis semper lacus at venenatis. Praesent vestibulum ligula nulla, at tempus lorem consequat suscipit. Aenean consequat dapibus dui, at bibendum mauris porta a.</p>
                    </div>
                </ui5-dynamic-side-content>
                <div slot="footer">
                    <ui5-bar design="FloatingFooter">
                        <ui5-button id="toggleButton" design="Positive" slot="endContent">Toggle</ui5-button>
                    </ui5-bar>
                </div>
            </ui5-page>
        </div>
    </div>
    <script>
        toggleButton.addEventListener("click", function() {
            dynamicSideContent.toggleContents();
        });
    <\/script>
\``,...(B=(Q=i.parameters)==null?void 0:Q.docs)==null?void 0:B.source}}};const te=["Template0","Template1","Template2","Template3","Template4","Template5","Template6","Template7"];export{t as Template0,n as Template1,a as Template2,s as Template3,u as Template4,r as Template5,o as Template6,i as Template7,te as __namedExportsOrder,ie as default};
//# sourceMappingURL=DynamicSideContent.stories.b48a8b8c.js.map
