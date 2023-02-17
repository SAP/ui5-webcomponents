import{y as n}from"./lit-html.9e2e9691.js";import{l as i}from"./if-defined.fd0de8da.js";import{o}from"./unsafe-html.9d6beac9.js";import{A as M}from"./AvatarGroupType.e8da1546.js";import{D as _}from"./docs.ac7cb078.js";import"./index.854754ad.js";import"./iframe.7e023a71.js";import"../sb-preview/runtime.mjs";import"./_commonjsHelpers.b8add541.js";import"./index.5ca63ce8.js";import"./_getTag.ec397a63.js";import"./index.bc622db0.js";import"./index.b38f6aa4.js";import"./chunk-MA2MUXQN.028c5fc4.js";import"./chunk-R4NKYYJA.15989c7a.js";const z={type:{control:"select",options:["Group","Individual"]},default:{control:{type:"text"}},overflowButton:{control:{type:"text"}}},A={package:"@ui5/webcomponents",since:"1.0.0-rc.11"};var s=Object.freeze,w=Object.defineProperty,x=(a,r)=>s(w(a,"raw",{value:s(r||a.slice())})),v;const G=()=>n(v||(v=x([`<div class="group">
    <ui5-popover
        header-text="My people"
        class="peoplePopover"
        style="width: 400px"
        placement-type="Bottom"
    >
        <div
            class="placeholder"
            style="display: flex; flex-wrap: wrap;"
        ></div>
    </ui5-popover>
    <ui5-slider min="1" max="100" value="60"></ui5-slider>
    <ui5-avatar-group type="Group">
        <ui5-avatar size="M" icon="employee"></ui5-avatar>
        <ui5-avatar size="M" icon="employee"></ui5-avatar>
        <ui5-avatar size="M" initials="JD"></ui5-avatar>
        <ui5-avatar size="M">
            <img
                src="../assets/images/avatars/woman_avatar_5.png"
                alt="Woman Avatar 5"
            />
        </ui5-avatar>
        <ui5-avatar size="M">
            <img
                src="../assets/images/avatars/man_avatar_3.png"
                alt="Man Avatar 3"
            />
        </ui5-avatar>
        <ui5-avatar size="M" icon="employee"></ui5-avatar>
        <ui5-avatar size="M" icon="employee"></ui5-avatar>
        <ui5-avatar size="M" initials="JD"></ui5-avatar>
        <ui5-avatar size="M">
            <img
                src="../assets/images/avatars/woman_avatar_5.png"
                alt="Woman Avatar 5"
            />
        </ui5-avatar>
        <ui5-avatar size="M">
            <img
                src="../assets/images/avatars/man_avatar_3.png"
                alt="Man Avatar 3"
            />
        </ui5-avatar>
        <ui5-avatar size="M" icon="employee"></ui5-avatar>
        <ui5-avatar size="M" icon="employee"></ui5-avatar>
        <ui5-avatar size="M" initials="JD"></ui5-avatar>
        <ui5-avatar size="M">
            <img
                src="../assets/images/avatars/woman_avatar_5.png"
                alt="Woman Avatar 5"
            />
        </ui5-avatar>
        <ui5-avatar size="M">
            <img
                src="../assets/images/avatars/man_avatar_3.png"
                alt="Man Avatar 3"
            />
        </ui5-avatar>
    </ui5-avatar-group>
    <script>
        (function () {
            const section = document.querySelector(".group");
            const slider = section.querySelector("ui5-slider");
            const avatarGroup = section.querySelector("ui5-avatar-group");
            const peoplePopover = section.querySelector(".peoplePopover");
            function onAvatarGroupClick(targetRef) {
                const placeholder =
                    peoplePopover.querySelector(".placeholder");
                let html = "";
                avatarGroup.items.forEach((avatar, index) => {
                    const avatarColor = avatarGroup.colorScheme[index];
                    html += \`<div class="avatar-slot" style="padding: 5px">
        <ui5-avatar interactive icon="\${avatar.icon}" initials="\${avatar.initials}" color-scheme="\${avatarColor}">\`;
                    if (avatar.image.length > 0) {
                        html += \`<img src="\${avatar.image[0].src}">\`;
                    }
                    html += \`</ui5-avatar></div>\`;
                });
                placeholder.innerHTML = html;
                peoplePopover.close();
                peoplePopover.showAt(targetRef);
            }
            avatarGroup.addEventListener("click", function (event) {
                onAvatarGroupClick(event.detail.targetRef);
            });
            avatarGroup.style.width = slider.getAttribute("value") + "%";
            slider.addEventListener("input", function (event) {
                avatarGroup.style.width = event.target.value + "%";
            });
        })();
    <\/script>
</div>
`],[`<div class="group">
    <ui5-popover
        header-text="My people"
        class="peoplePopover"
        style="width: 400px"
        placement-type="Bottom"
    >
        <div
            class="placeholder"
            style="display: flex; flex-wrap: wrap;"
        ></div>
    </ui5-popover>
    <ui5-slider min="1" max="100" value="60"></ui5-slider>
    <ui5-avatar-group type="Group">
        <ui5-avatar size="M" icon="employee"></ui5-avatar>
        <ui5-avatar size="M" icon="employee"></ui5-avatar>
        <ui5-avatar size="M" initials="JD"></ui5-avatar>
        <ui5-avatar size="M">
            <img
                src="../assets/images/avatars/woman_avatar_5.png"
                alt="Woman Avatar 5"
            />
        </ui5-avatar>
        <ui5-avatar size="M">
            <img
                src="../assets/images/avatars/man_avatar_3.png"
                alt="Man Avatar 3"
            />
        </ui5-avatar>
        <ui5-avatar size="M" icon="employee"></ui5-avatar>
        <ui5-avatar size="M" icon="employee"></ui5-avatar>
        <ui5-avatar size="M" initials="JD"></ui5-avatar>
        <ui5-avatar size="M">
            <img
                src="../assets/images/avatars/woman_avatar_5.png"
                alt="Woman Avatar 5"
            />
        </ui5-avatar>
        <ui5-avatar size="M">
            <img
                src="../assets/images/avatars/man_avatar_3.png"
                alt="Man Avatar 3"
            />
        </ui5-avatar>
        <ui5-avatar size="M" icon="employee"></ui5-avatar>
        <ui5-avatar size="M" icon="employee"></ui5-avatar>
        <ui5-avatar size="M" initials="JD"></ui5-avatar>
        <ui5-avatar size="M">
            <img
                src="../assets/images/avatars/woman_avatar_5.png"
                alt="Woman Avatar 5"
            />
        </ui5-avatar>
        <ui5-avatar size="M">
            <img
                src="../assets/images/avatars/man_avatar_3.png"
                alt="Man Avatar 3"
            />
        </ui5-avatar>
    </ui5-avatar-group>
    <script>
        (function () {
            const section = document.querySelector(".group");
            const slider = section.querySelector("ui5-slider");
            const avatarGroup = section.querySelector("ui5-avatar-group");
            const peoplePopover = section.querySelector(".peoplePopover");
            function onAvatarGroupClick(targetRef) {
                const placeholder =
                    peoplePopover.querySelector(".placeholder");
                let html = "";
                avatarGroup.items.forEach((avatar, index) => {
                    const avatarColor = avatarGroup.colorScheme[index];
                    html += \\\`<div class="avatar-slot" style="padding: 5px">
        <ui5-avatar interactive icon="\\\${avatar.icon}" initials="\\\${avatar.initials}" color-scheme="\\\${avatarColor}">\\\`;
                    if (avatar.image.length > 0) {
                        html += \\\`<img src="\\\${avatar.image[0].src}">\\\`;
                    }
                    html += \\\`</ui5-avatar></div>\\\`;
                });
                placeholder.innerHTML = html;
                peoplePopover.close();
                peoplePopover.showAt(targetRef);
            }
            avatarGroup.addEventListener("click", function (event) {
                onAvatarGroupClick(event.detail.targetRef);
            });
            avatarGroup.style.width = slider.getAttribute("value") + "%";
            slider.addEventListener("input", function (event) {
                avatarGroup.style.width = event.target.value + "%";
            });
        })();
    <\/script>
</div>
`])));var p=Object.freeze,P=Object.defineProperty,S=(a,r)=>p(P(a,"raw",{value:p(r||a.slice())})),l;const I=()=>n(l||(l=S([`<div class="individual">
    <ui5-popover
        header-text="Person Card"
        class="personPopover"
        style="width: 300px"
        placement-type="Bottom"
        prevent-focus-restore=""
    >
        <div class="avatar-slot" style="display: inline-block;">
            <ui5-avatar id="popAvatar"></ui5-avatar>
        </div>
        <div class="title-slot" style="display: inline-block;">
            <ui5-title level="H5">John Doe</ui5-title>
            <ui5-title level="H5">Software Developer</ui5-title>
        </div>
    </ui5-popover>
    <ui5-popover
        header-text="My people"
        class="peoplePopover"
        style="width: 400px"
        placement-type="Bottom"
    >
        <div class="placeholder" style="display: flex; flex-wrap: wrap;"></div>
    </ui5-popover>
    <ui5-slider id="sliderIndividual" min="1" max="100" value="60"></ui5-slider>
    <ui5-avatar-group type="Individual">
        <ui5-avatar size="M" icon="employee"></ui5-avatar>
        <ui5-avatar size="M" icon="employee"></ui5-avatar>
        <ui5-avatar size="M" initials="JD"></ui5-avatar>
        <ui5-avatar size="M">
            <img
                src="../assets/images/avatars/woman_avatar_5.png"
                alt="Woman Avatar 5"
            />
        </ui5-avatar>
        <ui5-avatar size="M">
            <img
                src="../assets/images/avatars/man_avatar_3.png"
                alt="Man Avatar 3"
            />
        </ui5-avatar>
        <ui5-avatar size="M" icon="employee"></ui5-avatar>
        <ui5-avatar size="M" icon="employee"></ui5-avatar>
        <ui5-avatar size="M" initials="JD"></ui5-avatar>
        <ui5-avatar size="M">
            <img
                src="../assets/images/avatars/woman_avatar_5.png"
                alt="Woman Avatar 5"
            />
        </ui5-avatar>
        <ui5-avatar size="M">
            <img
                src="../assets/images/avatars/man_avatar_3.png"
                alt="Man Avatar 3"
            />
        </ui5-avatar>
        <ui5-avatar size="M" icon="employee"></ui5-avatar>
        <ui5-avatar size="M" icon="employee"></ui5-avatar>
        <ui5-avatar size="M" initials="JD"></ui5-avatar>
        <ui5-avatar size="M">
            <img
                src="../assets/images/avatars/woman_avatar_5.png"
                alt="Woman Avatar 5"
            />
        </ui5-avatar>
        <ui5-avatar size="M">
            <img
                src="../assets/images/avatars/man_avatar_3.png"
                alt="Man Avatar 3"
            />
        </ui5-avatar>
    </ui5-avatar-group>
    <script>
        (function () {
            const section = document.querySelector(".individual");
            const slider = section.querySelector("ui5-slider");
            const avatarGroup = section.querySelector("ui5-avatar-group");
            const peoplePopover = section.querySelector(".peoplePopover");
            const personPopover = section.querySelector(".personPopover");
            const popAvatar = personPopover.querySelector("ui5-avatar");
            function onAvatarClicked(avatarRef) {
                const avatarIndex = avatarGroup.items.indexOf(avatarRef);
                popAvatar.colorScheme = avatarGroup.colorScheme[avatarIndex];
                popAvatar.initials = avatarRef.initials;
                while (popAvatar.firstChild) {
                    popAvatar.removeChild(popAvatar.firstChild);
                }
                for (let i = 0; i < avatarRef.image.length; i++) {
                    popAvatar.appendChild(avatarRef.image[i].cloneNode());
                }
                popAvatar.icon = avatarRef.icon;
                personPopover.showAt(avatarRef);
            }
            function onButtonClicked(targetRef) {
                const hiddenItems = avatarGroup.hiddenItems;
                const placeholder = peoplePopover.querySelector(".placeholder");
                const firstHiddenIndex =
                    avatarGroup.items.length - hiddenItems.length;
                let html = "";
                hiddenItems.forEach((avatar, index) => {
                    const color =
                        avatarGroup.colorScheme[firstHiddenIndex + index];
                    html += \`<div class="avatar-slot" style="padding: 5px">
                <ui5-avatar interactive icon="\${avatar.icon}" initials="\${avatar.initials}" color-scheme="\${color}">\`;
                    if (avatar.image.length > 0) {
                        html += \`<img src="\${avatar.image[0].src}">\`;
                    }
                    html += \`</ui5-avatar></div>\`;
                });
                placeholder.innerHTML = html;
                peoplePopover.close();
                peoplePopover.showAt(targetRef);
            }
            avatarGroup.addEventListener("click", function (event) {
                if (event.detail.overflowButtonClicked) {
                    onButtonClicked(event.detail.targetRef);
                } else {
                    onAvatarClicked(event.detail.targetRef);
                }
            });
            avatarGroup.style.width = slider.getAttribute("value") + "%";
            slider.addEventListener("input", function (event) {
                avatarGroup.style.width = event.target.value + "%";
            });
        })();
    <\/script>
</div> `],[`<div class="individual">
    <ui5-popover
        header-text="Person Card"
        class="personPopover"
        style="width: 300px"
        placement-type="Bottom"
        prevent-focus-restore=""
    >
        <div class="avatar-slot" style="display: inline-block;">
            <ui5-avatar id="popAvatar"></ui5-avatar>
        </div>
        <div class="title-slot" style="display: inline-block;">
            <ui5-title level="H5">John Doe</ui5-title>
            <ui5-title level="H5">Software Developer</ui5-title>
        </div>
    </ui5-popover>
    <ui5-popover
        header-text="My people"
        class="peoplePopover"
        style="width: 400px"
        placement-type="Bottom"
    >
        <div class="placeholder" style="display: flex; flex-wrap: wrap;"></div>
    </ui5-popover>
    <ui5-slider id="sliderIndividual" min="1" max="100" value="60"></ui5-slider>
    <ui5-avatar-group type="Individual">
        <ui5-avatar size="M" icon="employee"></ui5-avatar>
        <ui5-avatar size="M" icon="employee"></ui5-avatar>
        <ui5-avatar size="M" initials="JD"></ui5-avatar>
        <ui5-avatar size="M">
            <img
                src="../assets/images/avatars/woman_avatar_5.png"
                alt="Woman Avatar 5"
            />
        </ui5-avatar>
        <ui5-avatar size="M">
            <img
                src="../assets/images/avatars/man_avatar_3.png"
                alt="Man Avatar 3"
            />
        </ui5-avatar>
        <ui5-avatar size="M" icon="employee"></ui5-avatar>
        <ui5-avatar size="M" icon="employee"></ui5-avatar>
        <ui5-avatar size="M" initials="JD"></ui5-avatar>
        <ui5-avatar size="M">
            <img
                src="../assets/images/avatars/woman_avatar_5.png"
                alt="Woman Avatar 5"
            />
        </ui5-avatar>
        <ui5-avatar size="M">
            <img
                src="../assets/images/avatars/man_avatar_3.png"
                alt="Man Avatar 3"
            />
        </ui5-avatar>
        <ui5-avatar size="M" icon="employee"></ui5-avatar>
        <ui5-avatar size="M" icon="employee"></ui5-avatar>
        <ui5-avatar size="M" initials="JD"></ui5-avatar>
        <ui5-avatar size="M">
            <img
                src="../assets/images/avatars/woman_avatar_5.png"
                alt="Woman Avatar 5"
            />
        </ui5-avatar>
        <ui5-avatar size="M">
            <img
                src="../assets/images/avatars/man_avatar_3.png"
                alt="Man Avatar 3"
            />
        </ui5-avatar>
    </ui5-avatar-group>
    <script>
        (function () {
            const section = document.querySelector(".individual");
            const slider = section.querySelector("ui5-slider");
            const avatarGroup = section.querySelector("ui5-avatar-group");
            const peoplePopover = section.querySelector(".peoplePopover");
            const personPopover = section.querySelector(".personPopover");
            const popAvatar = personPopover.querySelector("ui5-avatar");
            function onAvatarClicked(avatarRef) {
                const avatarIndex = avatarGroup.items.indexOf(avatarRef);
                popAvatar.colorScheme = avatarGroup.colorScheme[avatarIndex];
                popAvatar.initials = avatarRef.initials;
                while (popAvatar.firstChild) {
                    popAvatar.removeChild(popAvatar.firstChild);
                }
                for (let i = 0; i < avatarRef.image.length; i++) {
                    popAvatar.appendChild(avatarRef.image[i].cloneNode());
                }
                popAvatar.icon = avatarRef.icon;
                personPopover.showAt(avatarRef);
            }
            function onButtonClicked(targetRef) {
                const hiddenItems = avatarGroup.hiddenItems;
                const placeholder = peoplePopover.querySelector(".placeholder");
                const firstHiddenIndex =
                    avatarGroup.items.length - hiddenItems.length;
                let html = "";
                hiddenItems.forEach((avatar, index) => {
                    const color =
                        avatarGroup.colorScheme[firstHiddenIndex + index];
                    html += \\\`<div class="avatar-slot" style="padding: 5px">
                <ui5-avatar interactive icon="\\\${avatar.icon}" initials="\\\${avatar.initials}" color-scheme="\\\${color}">\\\`;
                    if (avatar.image.length > 0) {
                        html += \\\`<img src="\\\${avatar.image[0].src}">\\\`;
                    }
                    html += \\\`</ui5-avatar></div>\\\`;
                });
                placeholder.innerHTML = html;
                peoplePopover.close();
                peoplePopover.showAt(targetRef);
            }
            avatarGroup.addEventListener("click", function (event) {
                if (event.detail.overflowButtonClicked) {
                    onButtonClicked(event.detail.targetRef);
                } else {
                    onAvatarClicked(event.detail.targetRef);
                }
            });
            avatarGroup.style.width = slider.getAttribute("value") + "%";
            slider.addEventListener("input", function (event) {
                avatarGroup.style.width = event.target.value + "%";
            });
        })();
    <\/script>
</div> `]))),$=()=>n`<div class="snippet">
    <ui5-avatar-group type="Individual">
        <ui5-avatar size="S">
            <img
                src="../assets/images/avatars/man_avatar_1.png"
                alt="Man Avatar 1"
            />
        </ui5-avatar>
        <ui5-avatar size="S" initials="JD"></ui5-avatar>
        <ui5-avatar size="S">
            <img
                src="../assets/images/avatars/woman_avatar_5.png"
                alt="Woman Avatar 5"
            />
        </ui5-avatar>
        <ui5-avatar size="S">
            <img
                src="../assets/images/avatars/man_avatar_3.png"
                alt="Man Avatar 3"
            />
        </ui5-avatar>
    </ui5-avatar-group>
    <br />
    <ui5-avatar-group type="Individual">
        <ui5-avatar size="M">
            <img
                src="../assets/images/avatars/man_avatar_1.png"
                alt="Man Avatar 1"
            />
        </ui5-avatar>
        <ui5-avatar size="M" initials="JD"></ui5-avatar>
        <ui5-avatar size="M">
            <img
                src="../assets/images/avatars/woman_avatar_5.png"
                alt="Woman Avatar 5"
            />
        </ui5-avatar>
        <ui5-avatar size="M">
            <img
                src="../assets/images/avatars/man_avatar_3.png"
                alt="Man Avatar 3"
            />
        </ui5-avatar>
    </ui5-avatar-group>
    <br />
    <ui5-avatar-group type="Group">
        <ui5-avatar size="L">
            <img
                src="../assets/images/avatars/man_avatar_1.png"
                alt="Man Avatar 1"
            />
        </ui5-avatar>
        <ui5-avatar size="L" initials="JD"></ui5-avatar>
        <ui5-avatar size="L">
            <img
                src="../assets/images/avatars/woman_avatar_5.png"
                alt="Woman Avatar 5"
            />
        </ui5-avatar>
        <ui5-avatar size="L">
            <img
                src="../assets/images/avatars/man_avatar_3.png"
                alt="Man Avatar 3"
            />
        </ui5-avatar>
    </ui5-avatar-group>
</div> `,u="ui5-avatar-group",Q={title:"Main/AvatarGroup",component:u,argTypes:z,parameters:{docs:{page:_({...A,component:u})}}},f=a=>n`<ui5-avatar-group
    .type="${i(a.type)}"
    .aria-haspopup="${i(a.ariaHaspopup)}"
  >
    ${o(a.default)}
    ${o(a.overflowButton)}
  </ui5-avatar-group> `,e=f.bind({});e.storyName="Type Group";e.args={default:`
  <ui5-avatar size="M" icon="employee"></ui5-avatar>
  <ui5-avatar size="M" initials="JD"></ui5-avatar>
  <ui5-avatar size="M">
    <img
      src="../assets/images/avatars/woman_avatar_5.png"
      alt="Woman Avatar 5"
    />
  </ui5-avatar>`};const t=f.bind({});t.storyName="Type Individual";t.args={type:M.Individual,default:`
  <ui5-avatar size="M" icon="employee"></ui5-avatar>
  <ui5-avatar size="M" initials="JD"></ui5-avatar>
  <ui5-avatar size="M">
    <img
      src="../assets/images/avatars/woman_avatar_5.png"
      alt="Woman Avatar 5"
    />
  </ui5-avatar>`};const C=I.bind({});C.storyName="Type Individual with Popover";const R=G.bind({});R.storyName="Type Group with Popover";const D=$.bind({});D.storyName="Sizes";var c,m,d;e.parameters={...e.parameters,docs:{...(c=e.parameters)==null?void 0:c.docs,source:{originalSource:'args => html`<ui5-avatar-group\n    .type="${ifDefined(args.type)}"\n    .aria-haspopup="${ifDefined(args.ariaHaspopup)}"\n  >\n    ${unsafeHTML(args.default)}\n    ${unsafeHTML(args.overflowButton)}\n  </ui5-avatar-group> `',...(d=(m=e.parameters)==null?void 0:m.docs)==null?void 0:d.source}}};var g,y,h;t.parameters={...t.parameters,docs:{...(g=t.parameters)==null?void 0:g.docs,source:{originalSource:'args => html`<ui5-avatar-group\n    .type="${ifDefined(args.type)}"\n    .aria-haspopup="${ifDefined(args.ariaHaspopup)}"\n  >\n    ${unsafeHTML(args.default)}\n    ${unsafeHTML(args.overflowButton)}\n  </ui5-avatar-group> `',...(h=(y=t.parameters)==null?void 0:y.docs)==null?void 0:h.source}}};const U=["TypeGroup","TypeIndividual","TypeIndividualWithPopover","TypeGroupWithPopover","Sizes"];export{D as Sizes,e as TypeGroup,R as TypeGroupWithPopover,t as TypeIndividual,C as TypeIndividualWithPopover,U as __namedExportsOrder,Q as default};
//# sourceMappingURL=AvatarGroup.stories.f934a749.js.map
