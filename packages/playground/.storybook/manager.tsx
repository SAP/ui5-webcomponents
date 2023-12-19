import { addons } from '@storybook/manager-api';
import wcTheme from "./sbTheme";
import './addons/github/Github';
import './addons/TitleEnhancer';

addons.setConfig({
  theme: wcTheme,
});