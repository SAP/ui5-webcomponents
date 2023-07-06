import { useEffect } from "@storybook/preview-api";
import type { DecoratorFunction } from '@storybook/types';

export const usePreventKeys: DecoratorFunction = (storyFn, context) => {
    const preventKeys = (event: KeyboardEvent) => {
        event.stopPropagation();
    };

    useEffect(() => {
        const root = document.getElementById('root-inner');

        root?.addEventListener('keydown', preventKeys);
        root?.addEventListener('keyup', preventKeys);

        return () => {
            root?.removeEventListener('keydown', preventKeys);
            root?.removeEventListener('keyup', preventKeys);
        };
    }, []);

    return storyFn();
};
