import { html } from "lit";
let index = 0;
export default () => {
    index++;
    return html `<div class="individual-${index}">
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
            <div
                class="placeholder"
                style="display: flex; flex-wrap: wrap;"
            ></div>
        </ui5-popover>
        <ui5-slider
            id="sliderIndividual"
            min="1"
            max="100"
            value="60"
        ></ui5-slider>
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
                const section = document.querySelector(".individual-${index}");
                const slider = section.querySelector("ui5-slider");
                const avatarGroup = section.querySelector("ui5-avatar-group");
                const peoplePopover = section.querySelector(".peoplePopover");
                const personPopover = section.querySelector(".personPopover");
                const popAvatar = personPopover.querySelector("ui5-avatar");
                function onAvatarClicked(avatarRef) {
                    const avatarIndex = avatarGroup.items.indexOf(avatarRef);
                    popAvatar.colorScheme =
                        avatarGroup.colorScheme[avatarIndex];
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
                    const placeholder =
                        peoplePopover.querySelector(".placeholder");
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
        </script>
    </div> `;
};
//# sourceMappingURL=TemplateIndividualWithPopover.js.map