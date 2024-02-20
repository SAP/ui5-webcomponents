import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'My Site',
  tagline: 'Dinosaurs are cool',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://your-docusaurus-site.example.com',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'facebook', // Usually your GitHub org/user name.
  projectName: 'docusaurus', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

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
          sidebarPath: './sidebars.ts',
        },
        blog: {
          showReadingTime: true,
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
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
          type: 'docSidebar',
          sidebarId: 'documentationSidebar',
          position: 'left',
          label: 'Docs',
        },
        {
          type: 'docSidebar',
          sidebarId: 'componentsSidebar',
          position: 'left',
          label: 'Components',
        },
        {
          type: 'custom-themeNavbarItem',
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
              to: 'docs/documentation/',
            },
            {
              label: 'Slack',
              to: 'docs/documentation/',
            },
            {
              label: 'Youtube',
              to: 'docs/documentation/',
            },
            {
              label: 'GitHub',
              to: 'docs/documentation/',
            },
          ],
        },
        {
          title: 'Docs',
          items: [
            {
              label: 'Documentation',
              to: 'docs/documentation/',
            },
            {
              label: 'FAQ',
              to: 'docs/documentation/',
            },
          ],
        },
        {
          title: 'Legal & Privacy',
          items: [
            {
              label: 'Privacy',
              href: 'https://stackoverflow.com/questions/tagged/docusaurus',
            },
            {
              label: 'Terms of Use',
              href: 'https://stackoverflow.com/questions/tagged/docusaurus',
            },
            {
              label: 'Legal Disclosure',
              href: 'https://stackoverflow.com/questions/tagged/docusaurus',
            },
            {
              label: 'Trademarks',
              href: 'https://discordapp.com/invite/docusaurus',
            },
          ],
        },
        {
          title: 'Contact Us',
          items: [
            {
              label: 'Report Issue',
              to: 'docs/documentation/',
            },
            {
              label: 'Technical Questions',
              to: 'docs/documentation/',
            },
            {
              label: 'Product Questions',
              to: 'docs/documentation/',
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
