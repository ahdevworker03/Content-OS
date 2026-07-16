const { chromium } = require("playwright");
const fs = require("fs");
const path = require("path");
const defaultConfig = require("./export-config");

// Parse CLI overrides: --key value
const args = process.argv.slice(2);
const cliOverrides = {};
for (let i = 0; i < args.length; i += 2) {
  if (args[i].startsWith("--")) {
    cliOverrides[args[i].slice(2)] = args[i + 1];
  }
}

function resolveConfig() {
  const cfg = { ...defaultConfig };
  if (cliOverrides.url) cfg.url = cliOverrides.url;
  if (cliOverrides.output) cfg.outputDir = cliOverrides.output;
  if (cliOverrides.selector) cfg.slideSelector = cliOverrides.selector;
  if (cliOverrides.width) cfg.viewport.width = parseInt(cliOverrides.width, 10);
  if (cliOverrides.height) cfg.viewport.height = parseInt(cliOverrides.height, 10);
  if (cliOverrides.scale) cfg.viewport.deviceScaleFactor = parseFloat(cliOverrides.scale);
  if (cliOverrides.headless === "false") cfg.browser.headless = false;
  return cfg;
}

function padNumber(n, digits) {
  return String(n).padStart(digits, "0");
}

(async () => {
  const config = resolveConfig();

  console.log(`Export configuration:`);
  console.log(`  URL:       ${config.url}`);
  console.log(`  Selector:  ${config.slideSelector}`);
  console.log(`  Output:    ${config.outputDir}/`);
  console.log(`  Viewport:  ${config.viewport.width}x${config.viewport.height} @${config.viewport.deviceScaleFactor}x`);

  const browser = await chromium.launch(config.browser);
  const page = await browser.newPage({ viewport: config.viewport });

  await page.goto(config.url, { waitUntil: "networkidle" });
  await page.waitForTimeout(config.waitAfterLoad);

  const slides = page.locator(config.slideSelector);
  const count = await slides.count();
  console.log(`\nFound ${count} slide(s)`);

  const outputDir = config.outputDir;
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  for (let i = 0; i < count; i++) {
    const slide = slides.nth(i);
    await slide.scrollIntoViewIfNeeded();
    await page.waitForTimeout(config.waitBetweenSlides);
    await slide.waitFor({ state: "visible" });

    const filename = config.outputPattern.replace("{{n}}", padNumber(i + config.startIndex, config.padDigits));
    const filepath = path.join(outputDir, filename);

    await slide.screenshot({ path: filepath });
    console.log(`  Exported: ${filename}`);
  }

  await browser.close();
  console.log(`\n✅ Done — ${count} slide(s) exported to ${outputDir}/`);
})();
