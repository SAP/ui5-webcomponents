import { html } from "lit-html";

export default () => html`<div class="snippet">
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
</div> `;
