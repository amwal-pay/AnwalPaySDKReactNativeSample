#!/usr/bin/env node
/**
 * Patches react-amwal-pay's Android build files after npm install.
 *
 * Problem: react-amwal-pay pins ReactAmwalPay_kotlinVersion=2.0.0 in its own
 * gradle.properties, but amwal_sdk (pulled via `+` wildcard) now ships artifacts
 * compiled with Kotlin 2.2.x. The 2.0.0 compiler crashes when it encounters
 * 2.2.x metadata. We must upgrade the Kotlin version used by the library's own
 * buildscript classpath.
 *
 * Also pins amwal_sdk to a specific version to avoid future wildcard breakage.
 */

const fs = require('fs');
const path = require('path');

const libraryRoot = path.join(
  __dirname,
  '..',
  'node_modules',
  'react-amwal-pay',
  'android',
);

// --- Patch gradle.properties ---
const gradlePropsPath = path.join(libraryRoot, 'gradle.properties');
if (fs.existsSync(gradlePropsPath)) {
  let content = fs.readFileSync(gradlePropsPath, 'utf8');
  const original = content;
  content = content.replace(
    /ReactAmwalPay_kotlinVersion=.*/,
    'ReactAmwalPay_kotlinVersion=2.2.20',
  );
  if (content !== original) {
    fs.writeFileSync(gradlePropsPath, content, 'utf8');
    console.log('✅ Patched react-amwal-pay/android/gradle.properties: kotlinVersion → 2.2.20');
  } else {
    console.log('ℹ️  react-amwal-pay/android/gradle.properties already patched or pattern not found');
  }
} else {
  console.warn('⚠️  react-amwal-pay/android/gradle.properties not found — skipping');
}

// --- Patch build.gradle: pin amwal_sdk version ---
const buildGradlePath = path.join(libraryRoot, 'build.gradle');
if (fs.existsSync(buildGradlePath)) {
  let content = fs.readFileSync(buildGradlePath, 'utf8');
  const original = content;
  // Replace dynamic `+` version with pinned version
  content = content.replace(
    /("com\.amwal-pay:amwal_sdk:)\+"/,
    '$11.1.90"',
  );
  if (content !== original) {
    fs.writeFileSync(buildGradlePath, content, 'utf8');
    console.log('✅ Patched react-amwal-pay/android/build.gradle: amwal_sdk:+ → 1.1.90');
  } else {
    console.log('ℹ️  react-amwal-pay/android/build.gradle already patched or pattern not found');
  }
} else {
  console.warn('⚠️  react-amwal-pay/android/build.gradle not found — skipping');
}
