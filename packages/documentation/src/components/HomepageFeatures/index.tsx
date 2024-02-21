import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';
import handURL from "@site/static/img/hand.png";

type FeatureItem = {
  title: string;
  img?:  React.ComponentType<React.ComponentProps<'img'>>;
  Svg?: React.ComponentType<React.ComponentProps<'svg'>>;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Easy to Use',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
       Based on web standards - just HTML!
       Future-proof.
       Easy to add to your project.
      </>
    ),
  },
  {
    title: 'Lightweight',
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
       Tiny - come with a minimal footprint.
       Modular - take only the parts you need.
       Fast - built with performance in mind.
      </>
    ),
  },
  {
    title: 'Enterprise Ready',
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
       Implement the SAP Fiori design language.
       Feature-rich.
       Secure, accessible, themeable, i18n-ready.
      </>
    ),
  },
];

function Feature({title, Svg, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
