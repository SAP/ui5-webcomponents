import React from 'react';
import { addons, types } from '@storybook/manager-api';
import { IconButton, Icons } from '@storybook/components';

import wcTheme from "./sbTheme";

addons.setConfig({
  theme: wcTheme,
});

const ADDON_ID = 'github-button';

addons.register(ADDON_ID, (api) => {
  addons.add(ADDON_ID, {
    title: "Github",
    type: types.TOOL,
    match: ({ viewMode }) => !!(viewMode && viewMode.match(/^(story|docs)$/)),
    render: ({ active }) => {
      return (
        <IconButton
          active={active}
          onClick={() => {
            // redirect to github
            window.open('https://github.com/SAP/ui5-webcomponents', '_blank');
          }}
        >
          <Icons icon="github" style={{ marginRight: '0.25rem' }} />
          Github
        </IconButton>
      )
    },
  });
});