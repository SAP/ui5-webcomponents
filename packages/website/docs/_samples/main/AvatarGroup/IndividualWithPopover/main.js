import "@ui5/webcomponents/dist/Avatar.js";
import "@ui5/webcomponents/dist/AvatarGroup.js";
import "@ui5/webcomponents/dist/Title.js";
import "@ui5/webcomponents/dist/Popover.js";
import "@ui5/webcomponents/dist/Slider.js";

const section = document.querySelector(".individual");
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
	personPopover.open = false;
	personPopover.opener = avatarRef;
	personPopover.open = true;
}
function onButtonClicked(targetRef) {
    const hiddenItems = avatarGroup.hiddenItems;
    const placeholder = peoplePopover.querySelector(".placeholder");
    const firstHiddenIndex = avatarGroup.items.length - hiddenItems.length;
    let html = "";
    hiddenItems.forEach((avatar, index) => {
        const color =
            avatarGroup.colorScheme[firstHiddenIndex + index];
        html += `<div class="avatar-slot" style="padding: 5px">
    <ui5-avatar interactive icon="${avatar.icon}" initials="${avatar.initials}" color-scheme="${color}">`;
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