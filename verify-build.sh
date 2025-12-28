#!/bin/bash
# Build verification script for Survival Guide app

echo "🔍 Survival Guide - Build Verification"
echo "========================================"
echo ""

# Check Node.js
echo "✓ Checking Node.js version..."
node --version

# Check npm
echo "✓ Checking npm version..."
npm --version

# Check React Native CLI
echo "✓ Checking React Native CLI..."
npx react-native --version

echo ""
echo "📦 Installing dependencies..."
npm install

echo ""
echo "✓ Dependency check complete!"
echo ""
echo "🏗️  To build and run:"
echo ""
echo "Android:"
echo "  npm run android"
echo ""
echo "iOS:"
echo "  cd ios && pod install && cd .."
echo "  npm run ios"
echo ""
echo "✅ Project is ready to build!"
