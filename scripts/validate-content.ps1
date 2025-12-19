# PowerShell Content validation script for Physical AI Book

Write-Host "Starting content validation for Physical AI Book..."

# Check if npm is available
try {
    $npmVersion = npm --version
    Write-Host "✓ npm is available: $npmVersion"
}
catch {
    Write-Host "✗ Error: npm is not installed or available"
    exit 1
}

# Run docusaurus build to validate content
Write-Host "Running Docusaurus build to validate content..."
try {
    $buildResult = npx docusaurus build
    Write-Host "✓ Content validation passed - build successful"
    exit 0
}
catch {
    Write-Host "✗ Content validation failed - build errors detected"
    Write-Host $_.Exception.Message
    exit 1
}