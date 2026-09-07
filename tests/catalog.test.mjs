import test from "node:test";
import assert from "node:assert/strict";
import { readFile, access } from "node:fs/promises";
test("catalog exposes only seven real modules and 28 canonical practices", async () => {
  const { modules, exercises } = JSON.parse(
    await readFile("assets/data/catalog.json", "utf8"),
  );
  assert.equal(modules.length, 7);
  assert.equal(exercises.length, 28);
  assert.equal(new Set(exercises.map((item) => item.id)).size, 28);
  for (const module of modules) {
    await access(module.folder + "/README.md");
    const bundle = JSON.parse(
      await readFile(`assets/data/module-${module.id}.json`, "utf8"),
    );
    assert.ok(bundle.markdown.length > 300);
    assert.ok(module.quiz.options[module.quiz.answer]);
    for (const exercise of exercises.filter(
      (item) => item.module === module.id,
    )) {
      await access(exercise.path);
      assert.ok(bundle.sources[exercise.id].length);
      assert.ok(bundle.sources[exercise.id][0].code.length > 50);
      assert.ok(
        !exercise.path.includes("backup") &&
          !exercise.path.includes("refactored"),
      );
    }
  }
});
test("PHP source is bundled as text, and CSS exercises include their stylesheets", async () => {
  const php = JSON.parse(await readFile("assets/data/module-05.json", "utf8"));
  assert.ok(php.sources["05-01"][0].code.includes("<?php"));
  const css = JSON.parse(await readFile("assets/data/module-02.json", "utf8"));
  assert.ok(css.sources["02-01"].some((file) => file.language === "css"));
});
