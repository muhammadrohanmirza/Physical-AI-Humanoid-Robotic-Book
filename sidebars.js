// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  tutorialSidebar: [
    {
      type: 'category',
      label: 'Introduction',
      items: [
        'intro',
      ],
      link: {
        type: 'doc',
        id: 'intro',
      },
    },
    {
      type: 'category',
      label: 'Chapter 1: Introduction to Physical AI',
      collapsed: false,
      items: [
        'chapter1/index',
        'chapter1/lesson1',
        'chapter1/lesson2',
        'chapter1/lesson3',
      ],
    },
    {
      type: 'category',
      label: 'Chapter 2: Sensing the Physical World',
      collapsed: false,
      items: [
        'chapter2/index',
        'chapter2/lesson1',
        'chapter2/lesson2',
        'chapter2/lesson3',
      ],
    },
    {
      type: 'category',
      label: 'Exercises',
      collapsed: false,
      items: [
        'exercises/chapter1/exercise1',
        'exercises/chapter1/exercise2',
        'exercises/chapter1/exercise3',
        'exercises/chapter2/exercise1',
        'exercises/chapter2/exercise2',
        'exercises/chapter2/exercise3',
      ],
    },
    {
      type: 'category',
      label: 'Solutions',
      collapsed: true,
      items: [
        'exercises/solutions/exercise1-solution',
        'exercises/solutions/exercise2-solution',
        'exercises/solutions/exercise2-2-solution',
        'exercises/solutions/exercise2-3-solution',
        'exercises/solutions/exercise3-solution',
      ],
    },
  ],
};

export default sidebars;