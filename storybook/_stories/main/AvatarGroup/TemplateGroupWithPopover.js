import { html } from "lit";
let index = 0;
export default () => {
    index++;
    return html `<div class="group-${index}">
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
                const section = document.querySelector(".group-${index}");
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
        </script>
    </div> `;
};
//# sourceMappingURL=TemplateGroupWithPopover.js.map