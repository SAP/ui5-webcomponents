import { mergeConfig, type InlineConfig } from "vite";
import type { StorybookViteConfig } from "@storybook/builder-vite";

const config: StorybookViteConfig = {
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
  async viteFinal(config) {
    config.base =
      process.env.NODE_ENV === "production"
        ? "/ui5-webcomponents/_playground/"
        : "/";

    return mergeConfig(config, {
      // Use the same "resolve" configuration as your app
      // @ts-ignore
      resolve: (await import("../vite.config.ts")).default.resolve,
    });
  },
};

export default config;
