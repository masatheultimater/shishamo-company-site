#!/usr/bin/env npx tsx
/**
 * Design Tokens Generator
 *
 * design-tokens.jsonからtokens.cssを自動生成するスクリプト
 *
 * 使用方法:
 * npx tsx scripts/generate-tokens.ts
 *
 * または package.json に追加:
 * "scripts": {
 *   "tokens": "tsx scripts/generate-tokens.ts"
 * }
 */

import * as fs from 'fs';
import * as path from 'path';

// パス設定
const TOKENS_JSON_PATH = path.resolve(__dirname, '../shared/design-tokens.json');
const TOKENS_CSS_PATH = path.resolve(__dirname, '../src/styles/tokens.generated.css');

interface DesignToken {
  value: string;
  description?: string;
}

interface DesignTokens {
  meta?: {
    project?: string;
    style?: string;
    description?: string;
  };
  colors?: Record<string, DesignToken>;
  typography?: {
    'font-family'?: Record<string, string>;
    'font-size'?: Record<string, string>;
    'font-weight'?: Record<string, string>;
    'line-height'?: Record<string, string>;
  };
  spacing?: Record<string, string>;
  radius?: Record<string, string>;
  shadows?: Record<string, string>;
  breakpoints?: Record<string, string>;
  gradients?: Record<string, string>;
  animations?: Record<string, {
    keyframes: string;
    duration: string;
    timing: string;
    iteration: string;
    description?: string;
  }>;
}

function generateCSSVariables(tokens: DesignTokens): string {
  const lines: string[] = [];

  // Header
  lines.push('/**');
  lines.push(' * Auto-generated Design Tokens');
  lines.push(` * Generated from: shared/design-tokens.json`);
  lines.push(` * Generated at: ${new Date().toISOString()}`);
  lines.push(' * DO NOT EDIT DIRECTLY - Edit design-tokens.json instead');
  lines.push(' */');
  lines.push('');
  lines.push(':root {');

  // Colors
  if (tokens.colors) {
    lines.push('  /* ===== Colors ===== */');
    for (const [name, token] of Object.entries(tokens.colors)) {
      if (token.description) {
        lines.push(`  /* ${token.description} */`);
      }
      lines.push(`  --color-${name}: ${token.value};`);
    }
    lines.push('');
  }

  // Typography - Font Family
  if (tokens.typography?.['font-family']) {
    lines.push('  /* ===== Font Family ===== */');
    for (const [name, value] of Object.entries(tokens.typography['font-family'])) {
      lines.push(`  --font-${name}: ${value};`);
    }
    lines.push('');
  }

  // Typography - Font Size
  if (tokens.typography?.['font-size']) {
    lines.push('  /* ===== Font Size ===== */');
    for (const [name, value] of Object.entries(tokens.typography['font-size'])) {
      lines.push(`  --font-size-${name}: ${value};`);
    }
    lines.push('');
  }

  // Typography - Font Weight
  if (tokens.typography?.['font-weight']) {
    lines.push('  /* ===== Font Weight ===== */');
    for (const [name, value] of Object.entries(tokens.typography['font-weight'])) {
      lines.push(`  --font-weight-${name}: ${value};`);
    }
    lines.push('');
  }

  // Typography - Line Height
  if (tokens.typography?.['line-height']) {
    lines.push('  /* ===== Line Height ===== */');
    for (const [name, value] of Object.entries(tokens.typography['line-height'])) {
      lines.push(`  --line-height-${name}: ${value};`);
    }
    lines.push('');
  }

  // Spacing
  if (tokens.spacing) {
    lines.push('  /* ===== Spacing ===== */');
    for (const [name, value] of Object.entries(tokens.spacing)) {
      lines.push(`  --space-${name}: ${value};`);
    }
    lines.push('');
  }

  // Border Radius
  if (tokens.radius) {
    lines.push('  /* ===== Border Radius ===== */');
    for (const [name, value] of Object.entries(tokens.radius)) {
      lines.push(`  --radius-${name}: ${value};`);
    }
    lines.push('');
  }

  // Shadows
  if (tokens.shadows) {
    lines.push('  /* ===== Shadows ===== */');
    for (const [name, value] of Object.entries(tokens.shadows)) {
      lines.push(`  --shadow-${name}: ${value};`);
    }
    lines.push('');
  }

  // Gradients
  if (tokens.gradients) {
    lines.push('  /* ===== Gradients ===== */');
    for (const [name, value] of Object.entries(tokens.gradients)) {
      lines.push(`  --gradient-${name}: ${value};`);
    }
    lines.push('');
  }

  // Breakpoints (as CSS custom properties for reference)
  if (tokens.breakpoints) {
    lines.push('  /* ===== Breakpoints (reference only) ===== */');
    for (const [name, value] of Object.entries(tokens.breakpoints)) {
      lines.push(`  --breakpoint-${name}: ${value};`);
    }
    lines.push('');
  }

  lines.push('}');
  lines.push('');

  // Animations (as @keyframes)
  if (tokens.animations) {
    lines.push('/* ===== Animations ===== */');
    for (const [name, animation] of Object.entries(tokens.animations)) {
      if (animation.description) {
        lines.push(`/* ${animation.description} */`);
      }
      lines.push(`@keyframes ${name} {`);
      lines.push(`  ${animation.keyframes}`);
      lines.push('}');
      lines.push('');
    }
  }

  return lines.join('\n');
}

function main(): void {
  console.log('Generating CSS tokens from design-tokens.json...');

  // Read tokens JSON
  if (!fs.existsSync(TOKENS_JSON_PATH)) {
    console.error(`Error: ${TOKENS_JSON_PATH} not found`);
    process.exit(1);
  }

  const tokensJson = fs.readFileSync(TOKENS_JSON_PATH, 'utf-8');
  const tokens: DesignTokens = JSON.parse(tokensJson);

  // Generate CSS
  const css = generateCSSVariables(tokens);

  // Write CSS file
  fs.writeFileSync(TOKENS_CSS_PATH, css);

  console.log(`Generated: ${TOKENS_CSS_PATH}`);
  console.log('Done!');
}

main();
