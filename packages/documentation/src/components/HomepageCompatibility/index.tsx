import clsx from 'clsx';
import Heading from '@theme/Heading';
import './styles.css';

type Item = {
  Svg?: React.ComponentType<React.ComponentProps<'svg'>>;
}

const BrowserList: Array<Item> = [
  {
    Svg:  require('@site/static/img/compatibility-browsers/Chrome.svg').default,
  },
  {
    Svg:  require('@site/static/img/compatibility-browsers/Edge.svg').default,
  },
  {
    Svg:  require('@site/static/img/compatibility-browsers/Safari.svg').default,
  },
  {
    Svg:  require('@site/static/img/compatibility-browsers/Mozilla.svg').default,
  },
];

const FramaworksList: Array<Item> = [
  {
    Svg:  require('@site/static/img/compatibility-frameworks/Angular.svg').default,
  },
  {
    Svg:  require('@site/static/img/compatibility-frameworks/React.svg').default,
  },
  {
    Svg:  require('@site/static/img/compatibility-frameworks/UI5.svg').default,
  },
  {
    Svg:  require('@site/static/img/compatibility-frameworks/Vue.svg').default,
  },
];

const Browser = ({ Svg }: Item) => {
  return (
    <Svg className="compatibility__logo"/>
  );
}

const Framework = ({ Svg }: Item) => {
  return (
    <Svg className="compatibility__logo"/>
  );
}

export default function HomepageCompatibility(): JSX.Element {
  return (
    <article className="compatibility__article">
      <section className="compatibility">
        <div className="compatibility__container">
            <h2 className="compatibility__title">Framework Compatibility</h2>
            <div >
              {FramaworksList.map((props, idx) => (
                  <Framework key={idx} {...props} />
                ))}
            </div>
        </div>
      </section>

      <section className="compatibility">
        <div className="compatibility__container">
            <h2 className="compatibility__title">Browser Compatibility</h2>
            <div>
                {BrowserList.map((props, idx) => (
                  <Browser key={idx} {...props} />
                ))}
            </div>
        </div>
      </section>
  </article>
  );
}