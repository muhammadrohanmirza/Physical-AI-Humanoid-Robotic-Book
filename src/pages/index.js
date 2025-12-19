import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title">{siteConfig.title}</h1>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/docs/intro">
            Start Reading - 5 min ⏱️
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="An accessible guide to understanding and implementing AI in physical systems">
      <HomepageHeader />
      <main>
        <section className={styles.about}>
          <div className="container">
            <div className="row">
              <div className="col col--6 col--offset-3">
                <h2>About This Book</h2>
                <p>
                  This comprehensive guide introduces the fascinating world of Physical AI – 
                  the integration of artificial intelligence techniques with physical systems and the real world.
                </p>
                <p>
                  Unlike traditional AI that operates primarily in digital spaces, Physical AI systems 
                  interact with, sense, understand, and act upon the physical environment. This includes 
                  robotics, autonomous vehicles, smart manufacturing, IoT systems, and other cyber-physical systems.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        <section className={styles.features}>
          <div className="container">
            <div className="row">
              <div className="col col--4">
                <h3>Hands-On Learning</h3>
                <p>
                  Each lesson includes practical exercises that you can implement to reinforce your understanding 
                  of Physical AI concepts.
                </p>
              </div>
              <div className="col col--4">
                <h3>Real-World Applications</h3>
                <p>
                  Learn how Physical AI concepts apply to real-world systems like autonomous vehicles, 
                  industrial robots, and smart environments.
                </p>
              </div>
              <div className="col col--4">
                <h3>Beginner-Friendly</h3>
                <p>
                  Designed for students and professionals new to Physical AI concepts, with step-by-step 
                  explanations and visual aids.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        <section className={styles.chapters}>
          <div className="container">
            <div className="row">
              <div className="col col--8 col--offset-2">
                <h2>Chapters</h2>
                <div className="card">
                  <div className="card__header">
                    <h3>Chapter 1: Introduction to Physical AI</h3>
                  </div>
                  <div className="card__body">
                    <p>
                      Explore the foundations of Physical AI, perception systems, and action & control mechanisms.
                      This chapter covers the core principles and concepts that form the basis of all Physical AI systems.
                    </p>
                    <Link className="button button--primary" to="/docs/chapter1">
                      Read Chapter 1
                    </Link>
                  </div>
                </div>
               
                <div className="card">
                  <div className="card__header">
                    <h3>Chapter 2: Sensing the Physical World</h3>
                  </div>
                  <div className="card__body">
                    <p>
                      Delve deeper into sensor technologies, data processing, and perception algorithms used in 
                      Physical AI systems. Learn how robots and autonomous systems understand their environment.
                    </p>
                    <Link className="button button--primary" to="/docs/chapter2">
                      Read Chapter 2
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}