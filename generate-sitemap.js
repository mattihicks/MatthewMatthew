#!/usr/bin/env node

/**
 * Auto-generates sitemap.xml by scanning all HTML files.
 * Run with: node generate-sitemap.js
 *
 * Posts in /posts/ get their dates extracted from filenames
 * (expected format: Title_DD_MM_YYYY.html)
 *
 * To customize priorities for main pages, edit the PAGE_CONFIG below.
 */

const fs = require('fs');
const path = require('path');

const SITE_URL = 'https://matthewmatthew.com';

// Configure priorities and change frequency for root-level pages.
// Any .html file in the root not listed here gets the defaults.
const PAGE_CONFIG = {
  'index.html':      { priority: '1.0', changefreq: 'weekly' },
  'about.html':      { priority: '0.9', changefreq: 'monthly' },
  'writing.html':    { priority: '0.9', changefreq: 'weekly' },
  'newsletter.html': { priority: '0.8', changefreq: 'monthly' },
  'music.html':      { priority: '0.7', changefreq: 'monthly' },
  'photos.html':     { priority: '0.7', changefreq: 'monthly' },
  'contact.html':    { priority: '0.7', changefreq: 'monthly' },
  'guestbook.html':  { priority: '0.6', changefreq: 'weekly' },
};

const ROOT_PAGE_DEFAULTS = { priority: '0.7', changefreq: 'monthly' };

// --- helpers ---

function extractDateFromPostFilename(filename) {
  // Matches _DD_MM_YYYY.html at the end of a filename
  const match = filename.match(/_(\d{2})_(\d{2})_(\d{4})\.html$/);
  if (!match) return null;
  const [, day, month, year] = match;
  return { iso: `${year}-${month}-${day}`, year: parseInt(year) };
}

function getPostPriority(year) {
  const currentYear = new Date().getFullYear();
  if (year >= currentYear - 1) return '0.8';
  if (year >= 2020) return '0.7';
  return '0.6';
}

function getFileMod(filePath) {
  const stat = fs.statSync(filePath);
  return stat.mtime.toISOString().split('T')[0];
}

function buildUrlEntry({ loc, lastmod, changefreq, priority }) {
  return [
    '  <url>',
    `    <loc>${loc}</loc>`,
    `    <lastmod>${lastmod}</lastmod>`,
    `    <changefreq>${changefreq}</changefreq>`,
    `    <priority>${priority}</priority>`,
    '  </url>',
  ].join('\n');
}

// --- main ---

const rootDir = __dirname;
const entries = [];

// 1. Root-level HTML pages
const rootFiles = fs.readdirSync(rootDir)
  .filter(f => f.endsWith('.html'))
  .sort();

for (const file of rootFiles) {
  const config = PAGE_CONFIG[file] || ROOT_PAGE_DEFAULTS;
  const loc = file === 'index.html'
    ? `${SITE_URL}/`
    : `${SITE_URL}/${file}`;

  entries.push(buildUrlEntry({
    loc,
    lastmod: getFileMod(path.join(rootDir, file)),
    changefreq: config.changefreq,
    priority: config.priority,
  }));
}

// 2. Posts (sorted newest first by date in filename)
const postsDir = path.join(rootDir, 'posts');
if (fs.existsSync(postsDir)) {
  const postFiles = fs.readdirSync(postsDir)
    .filter(f => f.endsWith('.html'));

  // Parse dates and sort newest first
  const posts = postFiles
    .map(file => {
      const dateInfo = extractDateFromPostFilename(file);
      return { file, dateInfo };
    })
    .sort((a, b) => {
      if (!a.dateInfo || !b.dateInfo) return 0;
      return b.dateInfo.iso.localeCompare(a.dateInfo.iso);
    });

  for (const { file, dateInfo } of posts) {
    const lastmod = dateInfo ? dateInfo.iso : getFileMod(path.join(postsDir, file));
    const priority = dateInfo ? getPostPriority(dateInfo.year) : '0.7';

    entries.push(buildUrlEntry({
      loc: `${SITE_URL}/posts/${file}`,
      lastmod,
      changefreq: 'yearly',
      priority,
    }));
  }
}

// 3. Write sitemap.xml
const sitemap = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...entries,
  '</urlset>',
  '',
].join('\n');

const outputPath = path.join(rootDir, 'sitemap.xml');
fs.writeFileSync(outputPath, sitemap, 'utf-8');

// Summary
const postCount = fs.existsSync(postsDir)
  ? fs.readdirSync(postsDir).filter(f => f.endsWith('.html')).length
  : 0;
console.log(`✓ sitemap.xml generated — ${rootFiles.length} pages + ${postCount} posts`);
