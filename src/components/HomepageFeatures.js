import clsx from 'clsx';
import styles from './HomepageFeatures.module.css';

const FeatureList = [
  {
    title: 'Easy to Understand',
    Svg: require('../../static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        Our Physical AI concepts are explained in simple terms with practical examples
        that make complex topics accessible to beginners.
      </>
    ),
  },
  {
    title: 'Focus on Practice',
    Svg: require('../../static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        Each lesson includes hands-on exercises to reinforce theoretical concepts
        and help you apply what you learn.
      </>
    ),
  },
  {
    title: 'Real-World Applications',
    Svg: require('../../static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        Learn how Physical AI concepts apply to real systems like robotics,
        autonomous vehicles, and smart environments.
      </>
    ),
  },
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} alt={title} />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
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