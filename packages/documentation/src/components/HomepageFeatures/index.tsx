import './styles.css';

type FeatureItem = {
  title: string;
  src?: string;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Easy to Use',
    src: require('@site/static/img/features/Frame.png').default,
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
    src: require('@site/static/img/features/hand.png').default,
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
    src: require('@site/static/img/features/buildings.png').default,
    description: (
      <>
       Implement the SAP Fiori design language.
       Feature-rich.
       Secure, accessible, themeable, i18n-ready.
      </>
    ),
  },
];

function Feature({title, src, description}: FeatureItem) {
  return (
    <div className="feature">
      <img className="feature__image" src={src} />
      <h3 className="feature__title">{title}</h3>
      <p className="feature__desc">{description}</p>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className="features">
      <div className="features__container">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
      </div>
    </section>
  );
}
