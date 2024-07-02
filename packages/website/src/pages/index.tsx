import clsx from 'clsx';
import Link from '@docusaurus/Link';
import { useColorMode } from '@docusaurus/theme-common';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import HomepageDemoApps from '@site/src/components/HomepageDemoApps';
import HomepageTestimonials from '@site/src/components/HomepageTestimonials';
import Heading from '@theme/Heading';
import LogoWater from "@site/static/img/logos/LogoWater.svg";

import styles from './index.module.css';

function Logo(props: { colorMode: string }) {
  return (
    <LogoWater className={styles.logoMain} />
  );
} 

function HomepageHeader() {
  const { colorMode } = useColorMode();

  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div  className={clsx('container', styles.container)}>
        <Logo colorMode={colorMode} />
        <Heading as="h1" className={clsx('hero__title', styles.heroTitle)}>
          <span className={styles.heroTitle__UI5}>UI5</span> Web Components
        </Heading>

        <p className={clsx('hero__subtitle', styles.heroSubtitle)}>
         An <span className={styles.hero__subtitle__part1}><b>open-source</b></span> UI components library for building <span className={styles.hero__subtitle__part2}><b>enterprise-ready</b></span> apps!
        </p>
        <div className={styles.buttons}>
          <Link
            className="button button--primary button--lg button--getting-started"
            to="/docs/getting-started/first-steps">
            Get Started
          </Link>

          <Link
            className={clsx("button button--secondary button--lg button--getting-started", styles.buttonSecondary)}
            to="/components/">
            Components
          </Link>
        </div>
      </div>
    </header>
  );
}


function Banner() {
  return (
    <div className="alert alert--info" role="alert" style={{fontSize: "1.5rem", textAlign: "center"}}>
        🎉&nbsp;<b>UI5 Web Components 2.0 is here!</b>
          <div>Discover the <b><a href="/blog/releases/announcing-rc-v2/"> all the exciting features in store!
            </a></b>&nbsp;🎉
          </div>
    </div>
  );
}

export default function Home(): JSX.Element {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />">
      <Banner />
      <HomepageHeader />
      <main>
        <HomepageFeatures />
        <HomepageDemoApps />
        <HomepageTestimonials />
      </main>

    </Layout>
  );
}
