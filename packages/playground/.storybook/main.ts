const isProd = process.env.NODE_ENV === "production";
const config = {
  stories: ["../docs/**/*.mdx", "../_stories/**/*.stories.@(ts)"],
  addons: ["@storybook/addon-links", "@storybook/addon-essentials", "@whitespace/storybook-addon-html"],
  framework: {
    name: "@storybook/web-components-vite",
    options: {}
  },
  core: {
    builder: "@storybook/builder-vite"
  },
  features: {
    storyStoreV7: true
  },
  env: (config: any) => ({
    ...config,
    // static assets loaded inside preview-head.html are located in the root
    // of the gh-pages branch and not in the _playground folder
    STORYBOOK_ASSETS_BASE: isProd ? "/ui5-webcomponents/" : "/"
  }),
  docs: {
    autodocs: true
  }
};
export default config;