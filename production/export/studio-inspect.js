const { chromium } = require("playwright");

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1600, height: 1000 } });
  await page.goto("http://localhost:5174/", { waitUntil: "networkidle" });
  await page.waitForTimeout(600);

  await page.screenshot({ path: "/tmp/opencode/studio-full.png" });

  // Sidebar list
  const items = await page.locator(".studio-sidebar__item").all();
  const sidebars = [];
  for (let i = 0; i < Math.min(items.length, 3); i++) {
    await items[i].click();
    await page.waitForTimeout(250);
    const slide = await page.locator(".studio-preview__slide").screenshot({ path: `/tmp/opencode/slide-${i}.png` });
    sidebars.push(await items[i].innerText().catch(() => ""));
  }

  // Validation panel
  const panelText = await page.locator(".studio__panels").innerText().catch(() => "(empty)");

  // Toolbar text
  const toolbarText = await page.locator(".studio-toolbar").innerText();

  // Debug panel
  await page.locator(".studio-debug__toggle").click().catch(() => {});
  await page.waitForTimeout(200);
  const debugOpen = await page.locator(".studio-debug__toggle").innerText().catch(() => "");

  console.log("SIDEBAR_ITEMS:", JSON.stringify(sidebars, null, 2));
  console.log("TOOLBAR:", JSON.stringify(toolbarText));
  console.log("PANELS:", JSON.stringify(panelText));
  console.log("DEBUG_TOGGLE:", JSON.stringify(debugOpen));

  await browser.close();
})();
