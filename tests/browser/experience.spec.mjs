import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { readFile } from "node:fs/promises";

test("demo explains HTML, CSS, and JavaScript through real interaction", async ({
  page,
}) => {
  await page.goto("/");
  await page.locator("button[data-stage=html]").click();
  await expect(page.locator("#demo-canvas")).toHaveAttribute(
    "data-stage",
    "html",
  );
  await expect(page.locator("#demo-like")).toBeDisabled();
  await page.locator("button[data-stage=css]").click();
  await expect(page.locator("#demo-caption")).toContainText("CSS");
  await page.locator("button[data-stage=js]").click();
  await page.locator("#demo-like").click();
  await expect(page.locator("#demo-count")).toHaveText("1");
});

test("keyboard navigation and preferences remain usable on mobile", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page
    .getByRole("button", { name: "Buka navigasi", exact: true })
    .click();
  await page
    .locator("#primary-nav")
    .getByRole("link", { name: "Modul belajar" })
    .click();
  await expect(
    page.getByRole("button", { name: "Buka navigasi", exact: true }),
  ).toHaveAttribute("aria-expanded", "false");
  await page.keyboard.press("/");
  await expect(page.locator("#catalog-search")).toBeFocused();
  await page
    .getByRole("button", { name: "Pengaturan kenyamanan belajar" })
    .click();
  await page.getByRole("switch", { name: /Teks lebih besar/ }).check();
  await page.getByRole("switch", { name: /Kurangi animasi/ }).check();
  await page.keyboard.press("Escape");
  await page.reload();
  await expect(page.locator("html")).toHaveClass(/large-text/);
  await expect(page.locator("html")).toHaveClass(/reduce-motion/);
  await page.goto("/#/module/01");
  await page.getByRole("tab", { name: "Panduan", exact: true }).focus();
  await page.keyboard.press("ArrowRight");
  await expect(page.getByRole("tab", { name: "File praktik" })).toHaveAttribute(
    "aria-selected",
    "true",
  );
  await expect(page.getByRole("tab", { name: "File praktik" })).toBeFocused();
  await page.locator(".skip-link").focus();
  await page.keyboard.press("Enter");
  await expect(page.locator("main")).toBeFocused();
  await expect(page).toHaveURL(/module\/01\?tab=practice/);
});

test("HTML and associated CSS import as a complete editable exercise", async ({
  page,
}) => {
  await page.goto("/#/module/02?tab=practice");
  await page
    .getByRole("button", { name: "Lihat kode Menghubungkan CSS eksternal" })
    .click();
  await expect(page.locator("#source-file option")).toHaveCount(2);
  await page.locator("#source-file").selectOption("1");
  await expect(page.locator(".source-code")).toContainText("body");
  await page.getByRole("button", { name: "Edit di playground" }).click();
  await expect(page).toHaveURL(/playground\?project=practice/);
  await page.getByRole("tab", { name: "CSS", exact: true }).click();
  await expect(page.getByRole("textbox", { name: "Kode CSS" })).toHaveValue(
    /body/,
  );
  await expect(page.frameLocator("#preview").locator("h1")).toBeVisible();
  expect(
    await page
      .frameLocator("#preview")
      .locator("body")
      .evaluate((element) => getComputedStyle(element).backgroundColor),
  ).not.toBe("rgba(0, 0, 0, 0)");
});

test("runtime errors are explained and student code cannot read app data", async ({
  page,
}) => {
  await page.goto("/#/playground");
  await page.getByRole("tab", { name: "JavaScript", exact: true }).click();
  await page
    .getByRole("textbox", { name: "Kode JavaScript" })
    .fill(
      'try { parent.localStorage.getItem("praktika.progress.v1"); } catch { console.log("App data isolated"); }\nthrow new Error("Cek nama variabelmu");',
    );
  await page.getByRole("button", { name: "Jalankan kode" }).click();
  await expect(page.locator("#console-output")).toContainText(
    "App data isolated",
  );
  await expect(page.locator("#console-output")).toContainText(
    "Cek nama variabelmu",
  );
  await page.evaluate(() =>
    window.postMessage(
      {
        source: "praktika-preview",
        token: "fake",
        kind: "error",
        text: "spoofed message",
      },
      "*",
    ),
  );
  await expect(page.locator("#console-output")).not.toContainText(
    "spoofed message",
  );
  await page.getByRole("button", { name: "Hentikan pratinjau" }).click();
  await expect(page.locator("#preview")).toHaveAttribute("srcdoc", "");
});

test("download contains the edited code and reset requires an explicit choice", async ({
  page,
}) => {
  await page.goto("/#/playground");
  await page
    .getByRole("textbox", { name: "Kode HTML" })
    .fill("<h1>Karya milikku</h1>");
  const downloadPromise = page.waitForEvent("download");
  await page.getByRole("button", { name: "Unduh hasil HTML" }).click();
  const download = await downloadPromise;
  expect(download.suggestedFilename()).toBe("praktika-profile.html");
  const exported = await readFile(await download.path(), "utf8");
  expect(exported).toContain("<h1>Karya milikku</h1>");
  expect(exported).not.toContain("praktika-preview");
  await page.getByRole("button", { name: "Reset kode", exact: true }).click();
  await page.getByRole("button", { name: "Tetap mengedit" }).click();
  await expect(page.getByRole("textbox", { name: "Kode HTML" })).toHaveValue(
    "<h1>Karya milikku</h1>",
  );
  await page.getByRole("button", { name: "Reset kode", exact: true }).click();
  await page
    .getByRole("dialog")
    .getByRole("button", { name: "Reset kode", exact: true })
    .click();
  await expect(
    page
      .frameLocator("#preview")
      .getByRole("heading", { name: "Halo, aku Aulia." }),
  ).toBeVisible();
});

test("async example handles both success and retry after an error", async ({
  page,
}) => {
  await page.goto("/#/playground?project=async");
  const preview = page.frameLocator("#preview");
  await preview.getByLabel("Coba simulasi gagal").check();
  await preview.getByRole("button", { name: "Muat data" }).click();
  await expect(preview.locator("#result")).toHaveText("Sedang memuat…");
  await expect(preview.locator("#result")).toContainText("Data belum tersedia");
  await preview.getByLabel("Coba simulasi gagal").uncheck();
  await preview.getByRole("button", { name: "Muat data" }).click();
  await expect(preview.locator("#result")).toContainText("Data berhasil tiba");
});

test("all seven original guides load with working practice lists", async ({
  page,
}) => {
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  for (const [id, count] of [
    ["01", 8],
    ["02", 7],
    ["03", 5],
    ["04", 2],
    ["05", 3],
    ["06", 2],
    ["07", 1],
  ]) {
    await page.goto("/#/module/" + id);
    await expect(page.locator(".prose h2").first()).toBeVisible();
    // JavaScript tutorials legitimately discuss the value `undefined`.
    expect((await page.locator(".prose").innerText()).length).toBeGreaterThan(
      300,
    );
    await page.getByRole("tab", { name: "File praktik" }).click();
    await expect(page.locator(".practice-row")).toHaveCount(count);
  }
  expect(errors).toEqual([]);
});

test("missing material offers a working retry", async ({ page }) => {
  let attempts = 0;
  await page.route("**/assets/data/module-03.json", (route) => {
    if (attempts++ === 0) return route.abort();
    return route.continue();
  });
  await page.goto("/#/module/03");
  await expect(page.getByRole("alert")).toContainText(
    "Materi belum bisa dimuat",
  );
  await page.getByRole("button", { name: "Coba lagi" }).click();
  await expect(page.locator(".prose")).toContainText("Bootstrap");
});

test("blocked storage preserves learning within the active session", async ({
  page,
}) => {
  await page.addInitScript(() => {
    Storage.prototype.getItem = () => {
      throw Error("Storage blocked");
    };
    Storage.prototype.setItem = () => {
      throw Error("Storage blocked");
    };
  });
  await page.goto("/#/module/01?tab=practice");
  await page
    .getByRole("button", { name: "Tandai selesai", exact: true })
    .first()
    .click();
  await expect(page.locator("#toast")).toContainText("sesi ini");
  await page.locator(".progress-link").click();
  await expect(page.locator(".progress-summary")).toContainText(
    "1 latihan selesai",
  );
  await page.goto("/#/playground");
  await expect(page.locator("#draft-status")).toContainText(
    "storage tidak tersedia",
  );
  await expect(
    page.frameLocator("#preview").getByRole("heading"),
  ).toBeVisible();
});

test("unknown routes recover and old meeting links open the right module", async ({
  page,
}) => {
  await page.goto("/#/missing");
  await expect(
    page.getByRole("heading", { name: "Sepertinya kamu tersesat sedikit." }),
  ).toBeVisible();
  await page.getByRole("link", { name: "Jelajahi modul" }).click();
  await expect(page.locator("[data-module-card]")).toHaveCount(7);
  await page.goto("/#pertemuan-03");
  await expect(
    page.getByRole("heading", { name: "Bootstrap & Grid", exact: true }),
  ).toBeVisible();
});

test("search opens from the home keyboard shortcut and retains a shared query", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page.locator("main h1")).toBeVisible();
  await page.keyboard.press("Control+k");
  await expect(page.locator("#catalog-search")).toBeFocused();
  await page.locator("#catalog-search").fill("bootstrap");
  await expect(page.locator("[data-module-card]")).toHaveCount(1);
  await page.reload();
  await expect(page.locator("#catalog-search")).toHaveValue("bootstrap");
  await expect(page.locator("[data-module-card]")).toHaveCount(1);
});

test("relative assets and module sources also work below a repository subpath", async ({
  page,
  request,
}) => {
  await page.route("**/praktikum-web/**", async (route) => {
    const url = new URL(route.request().url());
    url.pathname = url.pathname.replace(/^\/praktikum-web/, "");
    const response = await request.get(url.href);
    await route.fulfill({ response });
  });
  await page.goto("/praktikum-web/#/module/02?tab=practice");
  await page
    .getByRole("button", { name: "Lihat kode Menghubungkan CSS eksternal" })
    .click();
  await expect(page.locator("#source-file option")).toHaveCount(2);
  await page.getByRole("button", { name: "Edit di playground" }).click();
  await expect(
    page.frameLocator("#preview").getByRole("heading").first(),
  ).toBeVisible();
  await expect(page).toHaveURL(/\/praktikum-web\/#\/playground/);
});

test("mobile home and its navigation pass automated accessibility checks", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page
    .getByRole("button", { name: "Buka navigasi", exact: true })
    .click();
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

for (const width of [320, 390, 768, 1440]) {
  test(`no horizontal page overflow at ${width}px, including large text`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 900 });
    for (const route of [
      "/",
      "/#/modules",
      "/#/module/01",
      "/#/module/07",
      "/#/module/05?tab=practice",
      "/#/module/01?tab=quiz",
      "/#/progress",
      "/#/projects",
      "/#/saved",
      "/#/playground",
    ]) {
      await page.goto(route);
      await expect(page.locator("main")).toBeVisible();
      if (/module\/\d\d$/.test(route))
        await expect(page.locator(".prose")).toBeVisible();
      await page.evaluate(() => document.fonts.ready);
      expect(
        await page.evaluate(() => document.documentElement.scrollWidth),
        route,
      ).toBeLessThanOrEqual(width + 1);
      await page.evaluate(() =>
        document.documentElement.classList.add("large-text"),
      );
      expect(
        await page.evaluate(() => document.documentElement.scrollWidth),
        route + " large text",
      ).toBeLessThanOrEqual(width + 1);
    }
  });
}

for (const route of [
  "/#/projects",
  "/#/saved",
  "/#/module/01?tab=quiz",
  "/#/module/05?tab=practice",
]) {
  test(`additional accessible route ${route}`, async ({ page }) => {
    await page.goto(route);
    await expect(page.locator("main h1")).toBeVisible();
    if (route.includes("quiz"))
      await expect(page.locator(".quiz-card")).toBeVisible();
    if (route.includes("practice"))
      await expect(page.locator(".practice-row").first()).toBeVisible();
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

test("playground host and preferences have no automated accessibility violations", async ({
  page,
}) => {
  await page.goto("/#/playground");
  await expect(
    page.frameLocator("#preview").getByRole("heading"),
  ).toBeVisible();
  // Inspect the host only: student documents use an opaque, script-only iframe.
  await page.addScriptTag({ path: "node_modules/axe-core/axe.min.js" });
  const result = await page.evaluate(async () => {
    const result = await window.axe.run(document, {
      iframes: false,
      runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21aa"] },
    });
    return result.violations.map((item) => ({
      id: item.id,
      targets: item.nodes.map((node) => node.target),
    }));
  });
  expect(result).toEqual([]);
  await page.goto("/");
  await page
    .getByRole("button", { name: "Pengaturan kenyamanan belajar" })
    .click();
  const preferences = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  expect(preferences.violations.map((item) => item.id)).toEqual([]);
});
