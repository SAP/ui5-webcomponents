import { addons } from '@storybook/manager-api';
import { STORY_RENDERED } from '@storybook/core-events';

const ADDON_ID = 'title-enhancer';

addons.register(ADDON_ID, (api) => {
    const setTitle = () => {
        const storyData = api.getCurrentStoryData();
        const componentName = storyData.name.split('/').pop()?.toLowerCase();

        const componentTag = `ui5-${componentName}`;

        if (storyData) {
            const data = storyData;
            document.title = `${data.title} - ${componentTag} - UI5 Web Components | Documentation`;
        }
    };

    api.on(STORY_RENDERED, () => {
        setTitle();
    })
});