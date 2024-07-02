import remarkGfm from 'remark-gfm';
declare const config: {
    stories: string[];
    staticDirs: {
        from: string;
        to: string;
    }[];
    addons: (string | {
        name: string;
        options: {
            docs: boolean;
            mdxPluginOptions?: undefined;
        };
    } | {
        name: string;
        options: {
            mdxPluginOptions: {
                mdxCompileOptions: {
                    remarkPlugins: (typeof remarkGfm)[];
                };
            };
            docs?: undefined;
        };
    })[];
    framework: {
        name: string;
        options: {};
    };
    core: {
        builder: string;
    };
    features: {
        storyStoreV7: boolean;
        buildStoriesJson: boolean;
    };
    typescript: {
        reactDocgen: string;
    };
    docs: {
        autodocs: string;
    };
};
export default config;
