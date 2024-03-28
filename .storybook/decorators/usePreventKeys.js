import { useEffect } from "@storybook/preview-api";
export const usePreventKeys = (storyFn, context) => {
    const preventKeys = (event) => {
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
//# sourceMappingURL=usePreventKeys.js.map