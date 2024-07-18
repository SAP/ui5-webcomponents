import './styles.css';


import { useColorMode } from '@docusaurus/theme-common';

type FeatureItem = {
  title: string;
  src?: string,
  srcDark?: string,
  description: JSX.Element,
  cssClass?: string,
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Easy to Use',
    src: require('@site/static/img/features/light/Frame.png').default,
    srcDark: require('@site/static/img/features/dark/Frame.png').default,
    description: (
      <>
       Based on web standards - just HTML!
       Future-proof.
       Easy to add to your project.
      </>
    ),
    cssClass: "feature__image_frame"
  },
  {
    title: 'Lightweight',
    src: require('@site/static/img/features/light/Hand.png').default,
    srcDark: require('@site/static/img/features/dark/Hand.png').default,
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
    src: require('@site/static/img/features/light/Buildings.png').default,
    srcDark: require('@site/static/img/features/dark/Buildings.png').default,
    description: (
      <>
       Implements latest SAP Design language.
       Feature-rich.
       Secure, accessible, themeable, i18n-ready.
      </>
    ),
  },
];

function Feature({ title, src, srcDark, description, cssClass }: FeatureItem) {
  const { colorMode } = useColorMode();
  const light = colorMode === "light";

  return (
    <div className="feature">
      {light ? <img className={`feature__image ${cssClass}`} src={src} /> : <img className={`feature__image ${cssClass}`} src={srcDark} /> }
        <h2 className="feature__title">{title}</h2>
        <p className="feature__desc">{description}</p>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className="features">
      <div className="features__container mainPageContainer">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
      </div>
    </section>
  );
}
