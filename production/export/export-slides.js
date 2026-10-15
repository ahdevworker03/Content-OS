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

async function waitForSlideFonts(page) {
  await page.evaluate(async () => {
    await document.fonts.ready;
    await Promise.all([
      document.fonts.load('400 16px "Noto Sans Arabic"'),
      document.fonts.load('700 16px "Noto Sans Arabic"'),
      document.fonts.load('400 16px "IBM Plex Mono"'),
    ]);
  });
}

async function assertFooterInPng(page, png, slideBox, footerBox) {
  const result = await page.evaluate(async ({ pngBase64, slideBox, footerBox }) => {
    const image = new Image();
    image.src = `data:image/png;base64,${pngBase64}`;
    await image.decode();

    const canvas = document.createElement("canvas");
    canvas.width = image.width;
    canvas.height = image.height;
    const context = canvas.getContext("2d", { willReadFrequently: true });
    context.drawImage(image, 0, 0);

    const scaleX = image.width / slideBox.width;
    const scaleY = image.height / slideBox.height;
    const left = Math.round((footerBox.x - slideBox.x) * scaleX);
    const top = Math.round((footerBox.y - slideBox.y) * scaleY);
    const right = Math.round((footerBox.x + footerBox.width - slideBox.x) * scaleX);
    const bottom = Math.round((footerBox.y + footerBox.height - slideBox.y) * scaleY);
    const pixels = context.getImageData(0, 0, image.width, image.height).data;
    const differsFromCanvas = (x, y) => {
      const offset = (y * image.width + x) * 4;
      return Math.abs(pixels[offset] - 238) + Math.abs(pixels[offset + 1] - 230) + Math.abs(pixels[offset + 2] - 221) > 24;
    };

    let separatorPixels = 0;
    for (let y = top; y < Math.min(top + Math.ceil(4 * scaleY), bottom); y += 1) {
      let rowPixels = 0;
      for (let x = left; x < right; x += 1) if (differsFromCanvas(x, y)) rowPixels += 1;
      separatorPixels = Math.max(separatorPixels, rowPixels);
    }

    let glyphPixels = 0;
    for (let y = Math.min(bottom, top + Math.ceil(10 * scaleY)); y < bottom; y += 1) {
      for (let x = left; x < right; x += 1) if (differsFromCanvas(x, y)) glyphPixels += 1;
    }

    return {
      separatorPixels,
      glyphPixels,
      requiredSeparatorPixels: Math.floor((right - left) * 0.8),
    };
  }, {
    pngBase64: png.toString("base64"),
    slideBox,
    footerBox,
  });

  if (result.separatorPixels < result.requiredSeparatorPixels || result.glyphPixels < 60) {
    throw new Error(`Footer is clipped in exported PNG: ${JSON.stringify(result)}`);
  }
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
  await waitForSlideFonts(page);
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

    const [slideBox, footerBox] = await Promise.all([
      slide.boundingBox(),
      slide.locator(".slide__footer").boundingBox(),
    ]);
    if (!slideBox || !footerBox) throw new Error(`Footer is missing from slide ${i + 1}`);

    const png = await slide.screenshot({ path: filepath });
    if (await slide.evaluate((node) => node.classList.contains("personal-layout"))) {
      await assertFooterInPng(page, png, slideBox, footerBox);
    }
    console.log(`  Exported: ${filename}`);
  }

  await browser.close();
  console.log(`\n✅ Done — ${count} slide(s) exported to ${outputDir}/`);
})();
