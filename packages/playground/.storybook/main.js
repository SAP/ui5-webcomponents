module.exports = {
    stories: [
        "../docs/**/*.stories.mdx",
        "../_stories/**/*.stories.@(js|jsx|ts|tsx)",
    ],
    addons: ["@storybook/addon-links", "@storybook/addon-essentials"],
    framework: "@storybook/web-components",
    core: {
        builder: "@storybook/builder-vite",
    },
    features: {
        storyStoreV7: true,
    },
    viteFinal: (config) => {
        config.base =
            process.env.NODE_ENV === "production"
                ? "/ui5-webcomponents/_playground/"
                : "/";
        return config;
    },
};
