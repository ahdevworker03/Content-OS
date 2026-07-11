const { chromium } = require("playwright");
const fs = require("fs");

(async () => {
  const browser = await chromium.launch();

  const page = await browser.newPage({
    viewport: { width: 1920, height: 1080 },
    deviceScaleFactor: 2,
  });

  // 🔥 استخدم Live Server (مهم جداً)
  await page.goto("http://127.0.0.1:5500/Carousel%20Structure/index.html", {
    waitUntil: "networkidle",
  });

  // 🧠 خلي الصفحة تستقر (حل مشاكل الـ DOM)
  await page.waitForTimeout(1000);

  // 👇 عدّل هذا حسب الكلاس عندك إذا مختلف
  const slides = page.locator(".slide");

  const count = await slides.count();

  console.log(`Found ${count} slides`);

  // 📁 output folder
  const outputDir = "extracted-slides";
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
  }

  // 🚀 export loop
  for (let i = 0; i < count; i++) {
    const slide = slides.nth(i);

    await slide.scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);

    // 🧼 تأكد العنصر ثابت قبل التصوير
    await slide.waitFor({ state: "visible" });

    await slide.screenshot({
      path: `${outputDir}/slide-${String(i + 1).padStart(2, "0")}.png`,
    });

    console.log(`Exported slide ${i + 1}`);
  }

  await browser.close();

  console.log("✅ DONE: All slides exported successfully!");
})();
