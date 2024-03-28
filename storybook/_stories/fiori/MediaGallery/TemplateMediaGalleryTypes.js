import { html } from "lit";
export default () => html `
<div> Horizontal Media Gallery with initially selected item:
    <ui5-media-gallery layout="Horizontal">
        <ui5-media-gallery-item>
            <img src="../assets/images/HT-1000.jpg" />
        </ui5-media-gallery-item>
        <ui5-media-gallery-item selected="">
            <img src="../assets/images/HT-1010.jpg" />
        </ui5-media-gallery-item>
    </ui5-media-gallery>
</div>

</br>

<div> Vertical Media Gallery with initially disabled item:
    <ui5-media-gallery layout="Vertical" show-all-thumbnails>
        <ui5-media-gallery-item disabled>
            <img src="../assets/images/HT-1000.jpg" />
        </ui5-media-gallery-item>
        <ui5-media-gallery-item>
            <img src="../assets/images/HT-1010.jpg" />
        </ui5-media-gallery-item>
        <ui5-media-gallery-item>
            <img src="../assets/images/HT-1022.jpg" />
        </ui5-media-gallery-item>
        <ui5-media-gallery-item>
            <img src="../assets/images/HT-1030.jpg" />
        </ui5-media-gallery-item>
        <ui5-media-gallery-item>
            <img src="../assets/images/HT-2002.jpg" />
        </ui5-media-gallery-item>
        <ui5-media-gallery-item>
            <img src="../assets/images/HT-2026.jpg" />
        </ui5-media-gallery-item>
    </ui5-media-gallery>
</div>

</br>

<div> Horizontal Media Gallery with thumbnails on the right:
    <ui5-media-gallery layout="Horizontal" show-all-thumbnails menu-horizontal-align="Right">
        <ui5-media-gallery-item>
            <img src="../assets/images/HT-1000.jpg" />
        </ui5-media-gallery-item>
        <ui5-media-gallery-item>
            <img src="../assets/images/HT-1010.jpg" />
        </ui5-media-gallery-item>
        <ui5-media-gallery-item>
            <img src="../assets/images/HT-1022.jpg" />
        </ui5-media-gallery-item>
        <ui5-media-gallery-item>
            <img src="../assets/images/HT-1030.jpg" />
        </ui5-media-gallery-item>
        <ui5-media-gallery-item>
            <img src="../assets/images/HT-2002.jpg" />
        </ui5-media-gallery-item>
        <ui5-media-gallery-item>
            <img src="../assets/images/HT-2026.jpg" />
        </ui5-media-gallery-item>
    </ui5-media-gallery>
</div>

</br>

<div> Media Gallery with seperate image thumbnail:
    <ui5-media-gallery layout="Horizontal" show-all-thumbnails menu-horizontal-align="Right">
        <ui5-media-gallery-item>
            <img src="../assets/images/HT-1000.jpg" />
            <img src="../assets/images/HT-1000-small.jpg" slot="thumbnail"/>
        </ui5-media-gallery-item>
    </ui5-media-gallery>
</div>`;
//# sourceMappingURL=TemplateMediaGalleryTypes.js.map