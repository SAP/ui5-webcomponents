import { mergeConfig } from "vite";
import type { InlineConfig } from "vite";

const isProd = process.env.NODE_ENV === "production";

const config = {
  stories: ["../docs/**/*.stories.mdx", "../_stories/**/*.stories.@(ts)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@whitespace/storybook-addon-html",
  ],
  framework: "@storybook/web-components",
  core: {
    builder: "@storybook/builder-vite",
  },
  features: {
    storyStoreV7: true,
  },
  env: (config: any) => ({
    ...config,
    // static assets loaded inside preview-head.html are located in the root
    // of the gh-pages branch and not in the _playground folder
    STORYBOOK_ASSETS_BASE: isProd ? "/ui5-webcomponents/" : "/",
  }),
  async viteFinal(config: InlineConfig) {
    config.base = isProd ? "/ui5-webcomponents/_playground/" : "/";

    return mergeConfig(config, {
      // Use the same "resolve" configuration as your app
      // @ts-ignore
      resolve: (await import("../vite.config.ts")).default.resolve,
    });
  },
};

export default config;
