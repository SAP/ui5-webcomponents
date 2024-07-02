import { addons } from '@storybook/manager-api';
import { CURRENT_STORY_WAS_SET } from '@storybook/core-events';
const ADDON_ID = 'title-enhancer';
addons.register(ADDON_ID, (api) => {
    const setTitle = () => {
        const storyData = api.getCurrentStoryData();
        const getComponentTag = (title) => {
            const componentName = title.split('/').pop();
            return `ui5-${componentName?.split(' ').join('-').toLowerCase()}`;
        };
        let keywords = "";
        if (storyData?.tags?.includes('autodocs')) {
            // autodocs generated per component
            keywords = `${storyData.title} - ${getComponentTag(storyData.title)}`;
        }
        else if (storyData?.tags?.includes('story')) {
            // stories generated per component
            keywords = `${storyData.title} - ${getComponentTag(storyData.title)} - ${storyData.name}`;
        }
        else if (storyData?.tags?.includes('docs')) {
            // docs generated out of the md files
            keywords = `${storyData.title}`;
        }
        document.title = `${keywords} | UI5 Web Components | Documentation`;
    };
    api.on(CURRENT_STORY_WAS_SET, () => {
        setTitle();
    });
});
//# sourceMappingURL=TitleEnhancer.js.map