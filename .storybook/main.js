import remarkGfm from 'remark-gfm';
const config = {
    stories: ["../docs/**/*.mdx", "../_stories/**/*.stories.@(ts)", "../_stories/**/*.mdx"],
    staticDirs: [
        { from: "../assets", to: "../assets" },
        { from: "../docs/storybook-pages", to: "/" },
        { from: "../docs/landing-page.html", to: "../index.html" }, // from /docs/landing-page.html to /dist/index.html
    ],
    addons: [
        "@storybook/addon-links",
        {
            name: "@storybook/addon-essentials",
            options: {
                docs: false,
            },
        },
        "@whitespace/storybook-addon-html",
        {
            name: '@storybook/addon-docs',
            options: {
                mdxPluginOptions: {
                    mdxCompileOptions: {
                        remarkPlugins: [remarkGfm]
                    }
                }
            }
        }
    ],
    framework: {
        name: "@storybook/web-components-vite",
        options: {}
    },
    core: {
        builder: "@storybook/builder-vite"
    },
    features: {
        storyStoreV7: true,
        buildStoriesJson: true,
    },
    typescript: {
        reactDocgen: 'react-docgen'
    },
    docs: {
        autodocs: 'tag'
    }
};
export default config;
//# sourceMappingURL=main.js.map