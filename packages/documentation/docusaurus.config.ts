import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'UI5 Web Components',
  tagline: 'An open-source UI library for building enterprise-ready apps!',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://sap.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/ui5-webcomponents/',

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
        alt: 'My Site Logo',
        src: 'img/logo.png',
      },
      items: [
        {
          to: 'docs',
          label: 'Documentation',
          activeBasePath: 'docs',
        },
        {
          to: 'components/main/',
          label: 'Components',
          activeBasePath: 'components',
        },
        {
          type: 'custom-themeNavbarItem',
          position: "right",
        },
        {
          type: 'custom-contentDensityNavbarItem',
          position: "right",
        },
        {
          type: 'custom-TextDirectionNavbarItem',
          position: "right",
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
        alt: 'Meta Open Source Logo',
        src: 'https://sap.github.io/ui5-webcomponents/assets/footer/sap-1920-1440.svg',
        href: 'https://opensource.fb.com',
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
          ],
        },
        {
          title: 'Docs',
          items: [
            {
              label: 'Documentation',
              to: 'docs/',
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
