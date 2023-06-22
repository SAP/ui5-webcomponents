import { html } from 'lit-html';
import type { DecoratorFunction } from '@storybook/types';

export const usePreventKeys: DecoratorFunction = (storyFn, context) => {
    const story = storyFn(context);
    const stopPropagation = (e: Event) => e.stopPropagation();
    return html`<div @keydown=${stopPropagation} @keyup=${stopPropagation}>${story}</div>`;
};
