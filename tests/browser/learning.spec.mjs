import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("reads original material, records a practice, bookmarks a module and persists progress", async ({
  page,
}) => {
  await page.goto("/#/module/01");
  await expect(page.locator(".prose")).toContainText("HTML");
  await page.getByRole("button", { name: "Simpan modul", exact: true }).click();
  await page.getByRole("tab", { name: "File praktik" }).click();
  await page
    .getByRole("button", { name: "Tandai selesai", exact: true })
    .first()
    .click();
  await page.reload();
  await expect(
    page.getByRole("button", { name: "Sudah selesai", exact: true }).first(),
  ).toBeVisible();
  await page.goto("/#/saved");
  await expect(
    page.getByRole("heading", { name: "Fondasi HTML", exact: true }),
  ).toBeVisible();
});
test("search returns the matching module and empty query recovery works", async ({
  page,
}) => {
  await page.goto("/#/modules");
  await page
    .getByRole("searchbox", { name: "Cari modul dan latihan" })
    .fill("promise");
  await expect(page.locator("[data-module-card]")).toHaveCount(1);
  await expect(page.locator("[data-module-card]")).toContainText("Async & API");
  await page
    .getByRole("searchbox", { name: "Cari modul dan latihan" })
    .fill("zz-no-match");
  await expect(page.getByText("Belum ketemu? Coba kata lain.")).toBeVisible();
  await page.getByRole("button", { name: "Tampilkan semua modul" }).click();
  await expect(page.locator("[data-module-card]")).toHaveCount(7);
});
test("wrong quiz answer gives feedback and correct retry earns one completion", async ({
  page,
}) => {
  await page.goto("/#/module/01?tab=quiz");
  await page.getByLabel("<p> dengan font besar", { exact: true }).check();
  await page.getByRole("button", { name: "Periksa jawaban" }).click();
  await expect(
    page.getByRole("status").filter({ hasText: "Belum tepat" }),
  ).toBeVisible();
  await page.getByLabel("<h1>", { exact: true }).check();
  await page.getByRole("button", { name: "Periksa jawaban" }).click();
  await expect(
    page.getByRole("status").filter({ hasText: "Tepat sekali" }),
  ).toBeVisible();
  await page.reload();
  await expect(page.getByText("Kuis ini sudah kamu selesaikan.")).toBeVisible();
});
test("JavaScript playground runs and draft survives reload", async ({
  page,
}) => {
  await page.goto("/#/playground");
  await page.getByRole("tab", { name: "HTML", exact: true }).click();
  await page
    .getByRole("textbox", { name: "Kode HTML" })
    .fill('<h1 id="title">Halo</h1>');
  await page.getByRole("tab", { name: "JavaScript", exact: true }).click();
  await page
    .getByRole("textbox", { name: "Kode JavaScript" })
    .fill(
      'document.querySelector("#title").textContent = "Praktikum berhasil";',
    );
  await page.getByRole("button", { name: "Jalankan kode" }).click();
  await expect(
    page
      .frameLocator("#preview")
      .getByRole("heading", { name: "Praktikum berhasil" }),
  ).toBeVisible();
  await expect(page.locator("#preview")).toHaveAttribute(
    "sandbox",
    "allow-scripts",
  );
  await page.reload();
  await expect(
    page
      .frameLocator("#preview")
      .getByRole("heading", { name: "Praktikum berhasil" }),
  ).toBeVisible();
});
test("PHP files show source and instructions rather than a fake live preview", async ({
  page,
}) => {
  await page.goto("/#/module/05?tab=practice");
  await page
    .getByRole("button", { name: "Lihat kode Sintaks, variabel & tipe data" })
    .click();
  await expect(page.locator("#source-dialog pre")).toContainText("<?php");
  await expect(page.locator("#source-dialog")).toContainText(
    "php -S localhost:8000",
  );
  await expect(page.locator("#source-dialog iframe")).toHaveCount(0);
});
for (const route of ["/", "/#/modules", "/#/module/01", "/#/progress"]) {
  test(`accessible host ${route}`, async ({ page }) => {
    await page.goto(route);
    await expect(page.locator("main h1")).toBeVisible();
    if (route.includes("/module/"))
      await expect(page.locator(".prose")).toContainText("HTML");
    const result = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();
    expect(
      result.violations.map((item) => ({
        id: item.id,
        targets: item.nodes.map((node) => node.target),
      })),
    ).toEqual([]);
  });
}
