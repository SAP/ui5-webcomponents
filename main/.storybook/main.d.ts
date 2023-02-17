import remarkGfm from 'remark-gfm';
declare const config: {
    stories: string[];
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
    };
    typescript: {
        reactDocgen: string;
    };
    env: (config: any) => any;
    docs: {
        autodocs: boolean;
    };
};
export default config;
