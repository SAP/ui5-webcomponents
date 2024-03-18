import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import packageJson from "./package.json";


console.log(process.env.DEPLOYMENT_TYPE); // eslint-disable-line


const getBaseURL = () => {
  // localhost
  if (process.env.NODE_ENV === "development") {
    return "";
  }

  // latest deployment
  if (process.env.DEPLOYMENT_TYPE === "latest") {
    return "/ui5-webcomponents/";
  }

  // nightly deployment
  return "/ui5-webcomponents/nightly/";
};


const config: Config = {
  title: 'UI5 Web Components',
  tagline: 'An open-source UI components library for building enterprise-ready applications!',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://sap.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: getBaseURL(),

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'SAP', // Usually your GitHub org/user name.
  projectName: 'ui5-webcomponents', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  staticDirectories: ['public', 'static', 'local-cdn'],
  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          routeBasePath: '/',
          sidebarPath: './sidebars.ts',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],
  plugins: ['docusaurus-lunr-search'],


  themeConfig: {
    colorMode: {
      defaultMode: 'light',
      disableSwitch: true,
      respectPrefersColorScheme: false,
    },
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    navbar: {
      title: 'UI5 Web Components',
      logo: {
        alt: 'UI5 Web Components Logo',
        src: 'img/logo.png',
      },
      items: [
        {
          to: 'docs',
          label: 'Documentation',
          activeBasePath: 'docs',
        },
        {
          to: 'components/',
          label: 'Components',
          activeBasePath: 'components',
        },
        {
          to: 'icons/',
          label: 'Icons',
          activeBasePath: 'icons',
        },
        {
          to: 'play/',
          label: 'Playground',
          activeBasePath: 'play',
        },
        {
          type: 'custom-settingsNavbarItem',
          position: "right",
        },
        // {
        //   type: 'custom-contentDensityNavbarItem',
        //   position: "right",
        // },
        // {
        //   type: 'custom-TextDirectionNavbarItem',
        //   position: "right",
        // },
        {
          label: `v${packageJson.version}`,
          position: "right",
          to: `https://github.com/SAP/ui5-webcomponents/releases/tag/v${packageJson.version}`,
        },
        {
          type: 'custom-GitHubNavbarItem',
          position: "right",
        },
      ],
    },
    footer: {
      style: 'dark',
      copyright: `© Copyright ${new Date().getFullYear()}, SAP SE and UI5 Web Components Contributors`,
      logo: {
        alt: 'SAP Logo',
        src: 'https://sap.github.io/ui5-webcomponents/assets/footer/sap-1920-1440.svg',
        width: 160,
        height: 51,
      },
      links: [
        {
          title: 'Community',
          items: [
            {
              label: 'Twitter',
              to: 'https://twitter.com/ui5webcomps',
            },
            {
              label: 'Slack',
              to: 'https://openui5.slack.com/',
            },
            {
              label: 'Youtube',
              to: 'https://www.youtube.com/watch?v=9P5Jk4S3438&list=PLHUs_FUbq4dXkQpUt6b4eCXAAjiOg0IC-',
            },
            {
              label: 'GitHub',
              to: 'https://github.com/SAP/ui5-webcomponents/',
            },
            // {
            //   html: `
            //   <div style="display: flex; align-items: center;">
            //     <a href="https://twitter.com/ui5webcomps" target="_blank" rel="noreferrer noopener" aria-label="Twitter">
            //       <img src="img/footer/sap-twitter-1920-1440.svg" alt="Twitter" style="width: 2rem; height:2rem;margin-inline-end: 1rem;"/>
            //     </a>
            //     <a href="https://openui5.slack.com/" target="_blank" rel="noreferrer noopener" aria-label="Slack">
            //       <img src="img/footer/sap-slack-1920-1440.svg" alt="Slack" style="width: 2rem; height:2rem;margin-inline-end: 1rem;"/>
            //     </a>
            //     <a href="https://www.youtube.com/watch?v=9P5Jk4S3438&list=PLHUs_FUbq4dXkQpUt6b4eCXAAjiOg0IC-" target="_blank" rel="noreferrer noopener" aria-label="Youtube">
            //       <img src="img/footer/sap-youtube-1920-1440.svg" alt="Youtube" style="width: 2rem; height:2rem;margin-inline-end: 1rem;"/>
            //     </a>
            //     <a href="https://sap.github.io/ui5-webcomponents/" target="_blank" rel="noreferrer noopener" aria-label="GitHub">
            //       <img src="img/footer/sap-slack-1920-1440.svg" alt="GitHub" style="width: 2rem; height:2rem;margin-inline-end: 1rem;"/>
            //     </a>
            //   </div>
            // `,
            // },
          ],
        },
        {
          title: 'Docs',
          items: [
            {
              label: 'Documentation',
              to: '/docs/getting-started/first-steps',
            },
            {
              label: 'FAQ',
              to: 'docs/FAQ/',
            },
          ],
        },
        {
          title: 'Legal & Privacy',
          items: [
            {
              label: 'Privacy',
              href: 'https://www.sap.com/about/legal/privacy.html',
            },
            {
              label: 'Legal Disclosure',
              href: 'https://www.sap.com/about/legal/impressum.html',
            },
          ],
        },
        {
          title: 'Contact Us',
          items: [
            {
              label: 'Report Issue',
              to: 'https://github.com/SAP/ui5-webcomponents/issues/new',
            },
            {
              label: 'Technical Questions',
              to: 'https://openui5.slack.com/',
            },
            {
              label: 'Product Questions',
              to: 'mailto:openui5@sap.com?subject=[UI5 Web Components]',
            },
          ],
        },
      ],
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
