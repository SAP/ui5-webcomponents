import "@ui5/webcomponents/dist/Avatar.js";
import "@ui5/webcomponents/dist/AvatarGroup.js";
import "@ui5/webcomponents/dist/Popover.js";
import "@ui5/webcomponents/dist/Slider.js";

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
        html += `<div class="avatar-slot" style="padding: 5px">
<ui5-avatar interactive icon="${avatar.icon}" initials="${avatar.initials}" color-scheme="${avatarColor}">`;
        if (avatar.image.length > 0) {
            html += `<img src="${avatar.image[0].src}">`;
        }
        html += `</ui5-avatar></div>`;
    });
    placeholder.innerHTML = html;
    peoplePopover.opener = targetRef;
	peoplePopover.open = true;
}
avatarGroup.addEventListener("click", function (event) {
    onAvatarGroupClick(event.detail.targetRef);
});
avatarGroup.style.width = slider.getAttribute("value") + "%";
slider.addEventListener("input", function (event) {
    avatarGroup.style.width = event.target.value + "%";
});