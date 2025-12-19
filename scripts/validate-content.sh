#!/bin/bash
# Content validation script for Physical AI Book

echo "Starting content validation for Physical AI Book..."

# Check if docusaurus is installed
if ! command -v npx &> /dev/null; then
    echo "Error: npx is not installed or available"
    exit 1
fi

# Run docusaurus build to validate content
echo "Running Docusaurus build to validate content..."
if npx docusaurus build; then
    echo "✓ Content validation passed - build successful"
    exit 0
else
    echo "✗ Content validation failed - build errors detected"
    exit 1
fi