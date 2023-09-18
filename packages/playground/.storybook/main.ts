import remarkGfm from 'remark-gfm';

const config = {
  stories: ["../docs/**/*.mdx", "../_stories/**/*.stories.@(ts)"],
  staticDirs: [
    { from: "../assets", to: "../assets" }, // from /assets to /dist/assets
    { from: "../docs/storybook-pages", to: "/" }, // from /docs/storybook-pages to /dist/playground
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
    storyStoreV7: true
  },
  typescript: {
    reactDocgen: 'react-docgen'
  },
  docs: {
    autodocs: true
  }
};
export default config;