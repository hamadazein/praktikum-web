import { chromium } from "@playwright/test";
import { mkdir } from "node:fs/promises";
await mkdir("artifacts", { recursive: true });
const browser = await chromium.launch();
try {
  for (const [name, width, height] of [
    ["desktop", 1440, 1050],
    ["mobile", 390, 844],
  ]) {
    const context = await browser.newContext({
      viewport: { width, height },
      reducedMotion: "reduce",
    });
    const page = await context.newPage();
    await page.goto("http://127.0.0.1:4174/");
    await page.getByRole("heading", { name: /Dari belajar/ }).waitFor();
    await page.evaluate(() => document.fonts.ready);
    await page.screenshot({ path: `artifacts/home-${name}-cover.png` });
    await page.screenshot({
      path: `artifacts/home-${name}.png`,
      fullPage: true,
    });
    await page.goto("http://127.0.0.1:4174/#/module/01");
    await page.locator(".prose").waitFor();
    await page.screenshot({ path: `artifacts/learning-${name}.png` });
    await page.goto("http://127.0.0.1:4174/#/playground");
    await page.frameLocator("#preview").getByRole("heading").waitFor();
    await page.locator("#preview").scrollIntoViewIfNeeded();
    await page.evaluate(
      () =>
        new Promise((resolve) =>
          requestAnimationFrame(() => requestAnimationFrame(resolve)),
        ),
    );
    if (name === "mobile")
      await page.screenshot({
        path: "artifacts/playground-mobile-preview.png",
      });
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.screenshot({
      path: `artifacts/playground-${name}.png`,
      fullPage: true,
    });
    await context.close();
  }
} finally {
  await browser.close();
}
console.log("Saved interface screenshots in artifacts/.");
