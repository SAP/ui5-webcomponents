import { addons } from '@storybook/manager-api';
import wcTheme from "./sbTheme";
import './addons/github/Github';
import './addons/TitleEnhancer';
addons.setConfig({
    theme: wcTheme,
});
addons.setConfig({
    sidebar: {
        filters: {
            patterns: (item) => {
                return !(item.tags?.includes("_hidden_") && item.tags?.includes("story"));
            }
        }
    }
});
//# sourceMappingURL=manager.js.map