#!/bin/bash
# check-integration.sh
# プロジェクト統合確認スクリプト

set -e

echo "🔍 Running integration checks..."
echo ""

# 1. 必須ファイル確認
echo "📋 Checking required files..."
REQUIRED_FILES=(
  "shared/profile.yaml"
  "shared/project.rules"
  "shared/design-tokens.json"
  "shared/contracts/components.ts"
  "shared/contracts/api.ts"
  "src/styles/tokens.css"
  "src/styles/global.css"
  "public/_headers"
  "astro.config.mjs"
)

MISSING=0
for file in "${REQUIRED_FILES[@]}"; do
  if [ -f "$file" ]; then
    echo "   ✓ $file"
  else
    echo "   ✗ $file (MISSING)"
    MISSING=$((MISSING + 1))
  fi
done

if [ $MISSING -gt 0 ]; then
  echo ""
  echo "❌ $MISSING required files missing"
  exit 1
fi

echo ""
echo "📦 Checking dependencies..."
if [ -f "package.json" ]; then
  # microcms-js-sdk確認
  if grep -q "microcms-js-sdk" package.json; then
    echo "   ✓ microcms-js-sdk"
  else
    echo "   ✗ microcms-js-sdk (not installed)"
  fi
  
  # @astrojs/sitemap確認
  if grep -q "@astrojs/sitemap" package.json; then
    echo "   ✓ @astrojs/sitemap"
  else
    echo "   ✗ @astrojs/sitemap (not installed)"
  fi
fi

echo ""
echo "🏗️ Building project..."
npm run build

if [ $? -eq 0 ]; then
  echo ""
  echo "✅ Build successful!"
else
  echo ""
  echo "❌ Build failed"
  exit 1
fi

echo ""
echo "🚀 Starting preview server..."
npm run preview &
SERVER_PID=$!
sleep 3

echo ""
echo "🔦 Running Lighthouse..."
if command -v npx &> /dev/null; then
  npx lighthouse http://localhost:4321 \
    --output=json \
    --output-path=reports/lighthouse.json \
    --chrome-flags="--headless" \
    --only-categories=performance,accessibility,best-practices,seo \
    2>/dev/null
    
  echo ""
  echo "📊 Lighthouse Results:"
  if [ -f "reports/lighthouse.json" ]; then
    # スコア抽出（jqがあれば）
    if command -v jq &> /dev/null; then
      PERF=$(jq '.categories.performance.score * 100' reports/lighthouse.json)
      A11Y=$(jq '.categories.accessibility.score * 100' reports/lighthouse.json)
      BP=$(jq '.categories["best-practices"].score * 100' reports/lighthouse.json)
      SEO=$(jq '.categories.seo.score * 100' reports/lighthouse.json)
      
      echo "   Performance:     $PERF"
      echo "   Accessibility:   $A11Y"
      echo "   Best Practices:  $BP"
      echo "   SEO:             $SEO"
    else
      echo "   (Install jq to see scores)"
    fi
  fi
fi

# サーバー停止
kill $SERVER_PID 2>/dev/null

echo ""
echo "🔗 Checking links..."
if command -v npx &> /dev/null; then
  npm run preview &
  SERVER_PID=$!
  sleep 3
  
  npx broken-link-checker http://localhost:4321 --recursive 2>/dev/null || true
  
  kill $SERVER_PID 2>/dev/null
fi

echo ""
echo "✅ Integration check complete!"
echo ""
echo "📋 Summary:"
echo "   - Required files: All present"
echo "   - Build: Successful"
echo "   - Lighthouse: See reports/lighthouse.json"
echo ""
echo "🎯 Next: Manual review"
echo "   - Check responsive design (375px, 768px, 1440px)"
echo "   - Test form submission"
echo "   - Verify all links work"
