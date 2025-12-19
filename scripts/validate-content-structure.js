#!/usr/bin/env node

// Basic content validation script for Physical AI Book lessons
const fs = require('fs');
const path = require('path');

// Define the expected sections for each lesson
const expectedSections = [
  'Learning Objectives',
  'Summary'
];

// Define lesson paths
const lessonPaths = [
  'docs/chapter1/lesson1.md',
  'docs/chapter1/lesson2.md',
  'docs/chapter1/lesson3.md',
  'docs/chapter2/lesson1.md',
  'docs/chapter2/lesson2.md',
  'docs/chapter2/lesson3.md'
];

let validationPassed = true;

console.log('Starting content validation for Physical AI Book lessons...\n');

lessonPaths.forEach(lessonPath => {
  console.log(`Validating: ${lessonPath}`);

  if (!fs.existsSync(lessonPath)) {
    console.error(`❌ File does not exist: ${lessonPath}`);
    validationPassed = false;
    return;
  }

  const content = fs.readFileSync(lessonPath, 'utf8');

  // Check for frontmatter
  const hasFrontmatter = content.startsWith('---');
  if (!hasFrontmatter) {
    console.error(`❌ Missing frontmatter in: ${lessonPath}`);
    validationPassed = false;
  } else {
    console.log(`✅ Frontmatter present in: ${lessonPath}`);
  }

  // Check for expected sections
  expectedSections.forEach(section => {
    const sectionPattern = new RegExp(`^## ${section}`, 'm');
    if (sectionPattern.test(content)) {
      console.log(`✅ Section "${section}" present in: ${lessonPath}`);
    } else {
      console.error(`❌ Missing section "${section}" in: ${lessonPath}`);
      validationPassed = false;
    }
  });

  // Check for required frontmatter fields
  const frontmatterMatch = content.match(/---\n([\s\S]*?)\n---/);
  if (frontmatterMatch) {
    const frontmatter = frontmatterMatch[1];

    const requiredFields = ['title', 'description', 'sidebar_label'];
    requiredFields.forEach(field => {
      if (frontmatter.includes(field)) {
        console.log(`✅ Frontmatter field "${field}" present in: ${lessonPath}`);
      } else {
        console.error(`❌ Missing frontmatter field "${field}" in: ${lessonPath}`);
        validationPassed = false;
      }
    });
  }

  console.log('');
});

if (validationPassed) {
  console.log('✅ All content validation checks passed!');
  process.exit(0);
} else {
  console.log('❌ Some content validation checks failed!');
  process.exit(1);
}