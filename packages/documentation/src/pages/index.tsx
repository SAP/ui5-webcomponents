import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import HomepageCompatibility from '@site/src/components/HomepageCompatibility';
import Heading from '@theme/Heading';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div  className={clsx('container', styles.container)}>
        <Heading as="h1" className={clsx('hero__title', styles.heroTitle)}>
        <span className={styles.heroTitle__UI5}>UI5</span> Web Components
        </Heading>
        <p className={clsx('hero__subtitle', styles.heroSubtitle)}>
         An <span className={styles.hero__subtitle__part1}><b>open-source</b></span> UI library for building <span className={styles.hero__subtitle__part2}><b>enterprise-ready</b></span> apps!
        </p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/getting-started/first-steps">
            Get Started
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home(): JSX.Element {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
        <HomepageCompatibility />
      </main>

    </Layout>
  );
}
