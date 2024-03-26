export default `<ui5-dynamic-page-title slot="titleArea">
        <ui5-breadcrumbs slot="breadcrumbs">
            <ui5-breadcrumbs-item href="https://www.sap.com"
                >Link1
            </ui5-breadcrumbs-item>
            <ui5-breadcrumbs-item
                href="https://www.sap.com"
                target="_blank"
                >Link2</ui5-breadcrumbs-item
            >
            <ui5-breadcrumbs-item href="#">Link3</ui5-breadcrumbs-item>
            <ui5-breadcrumbs-item href="#">Link4</ui5-breadcrumbs-item>
            <ui5-breadcrumbs-item href="#">Link5</ui5-breadcrumbs-item>
            <ui5-breadcrumbs-item href="#">Link6</ui5-breadcrumbs-item>
            <ui5-breadcrumbs-item href="#">Link7</ui5-breadcrumbs-item>
            <ui5-breadcrumbs-item>Location</ui5-breadcrumbs-item>
        </ui5-breadcrumbs>

        <ui5-title slot="expandedHeading">Expanded Heading</ui5-title>

        <ui5-title slot="snappedHeading">Snapped Heading</ui5-title>

        <div slot="expandedContent">
            <ui5-title level="H6"
                >This is an expanded subheading</ui5-title
            >
        </div>

        <div slot="snappedContent">
            <ui5-title level="H6"
                >This is a snapped subheading</ui5-title
            >
        </div>

        <ui5-toolbar style="border: none" align-content="Start">
            <ui5-toolbar-button design="Transparent" overflow-priority="NeverOverflow"
                text="KPI Generic tag"
            ></ui5-toolbar-button>
        </ui5-toolbar>

        <ui5-toolbar slot="actions">
            <ui5-toolbar-button design="Transparent" text="Edit" overflow-priority="NeverOverflow"></ui5-toolbar-button>
            <ui5-toolbar-button design="Transparent" icon="delete"></ui5-toolbar-button>
            <ui5-toolbar-button design="Transparent" icon="copy"></ui5-toolbar-button>
            <ui5-toolbar-button design="Transparent" icon="share"></ui5-toolbar-button>
        </ui5-toolbar>

        <ui5-toolbar slot="navigationActions">
            <ui5-toolbar-button design="Transparent" icon="full-screen"></ui5-toolbar-button>
            <ui5-toolbar-button design="Transparent" icon="decline"></ui5-toolbar-button>
        </ui5-toolbar>
    </ui5-dynamic-page-title>`