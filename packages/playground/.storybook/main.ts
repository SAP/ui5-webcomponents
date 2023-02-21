import remarkGfm from 'remark-gfm';

const isProd = process.env.NODE_ENV === "production";
const config = {
  stories: ["../docs/**/*.mdx", "../_stories/**/*.stories.@(ts)"],
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
  env: (config: any) => ({
    ...config,
    // static assets loaded inside preview-head.html are located in the root
    // of the gh-pages branch and not in the _playground folder
    STORYBOOK_ASSETS_BASE: isProd ? "../" : "./"
  }),
  docs: {
    autodocs: true
  }
};
export default config;