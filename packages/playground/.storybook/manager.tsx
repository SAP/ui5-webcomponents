import { addons } from '@storybook/manager-api';
import wcTheme from "./sbTheme";
import './addons/github/Github';

addons.setConfig({
  theme: wcTheme,
});