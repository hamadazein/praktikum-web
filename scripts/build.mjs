import { readFile, writeFile, mkdir, copyFile } from "node:fs/promises";
import path from "node:path";
import { curriculum } from "./curriculum.mjs";

for (const folder of ["assets/data", "assets/vendor", "assets/fonts"])
  await mkdir(folder, { recursive: true });
const exercises = [];
const modules = [];
for (const item of curriculum) {
  const { lessons, ...module } = item;
  const markdown = await readFile(`${module.folder}/README.md`, "utf8");
  const sources = {};
  for (let index = 0; index < lessons.length; index++) {
    const [file, title] = lessons[index];
    const sourcePath = `${module.folder}/${file}`;
    const code = await readFile(sourcePath, "utf8");
    const id = `${module.id}-${String(index + 1).padStart(2, "0")}`;
    const language = path.extname(file).slice(1);
    sources[id] = [{ name: file, path: sourcePath, language, code }];
    if (language === "html") {
      for (const match of code.matchAll(
        /<link\b[^>]*href=["']([^"']+\.css)["'][^>]*>/gi,
      )) {
        if (/^(?:[a-z]+:|\/\/)/i.test(match[1])) continue;
        const cssPath = path.posix.join(module.folder, match[1]);
        const css = await readFile(cssPath, "utf8");
        sources[id].push({
          name: path.posix.basename(cssPath),
          path: cssPath,
          language: "css",
          code: css,
        });
      }
    }
    exercises.push({
      id,
      module: module.id,
      title,
      path: sourcePath,
      language,
      project: file.startsWith("studi-kasus") || file.includes("todo-app"),
      importable: Number(module.id) <= 2,
    });
  }
  modules.push({
    ...module,
    count: lessons.length,
    minutes: Math.max(5, Math.ceil(markdown.split(/\s+/).length / 200)),
  });
  await writeFile(
    `assets/data/module-${module.id}.json`,
    JSON.stringify({ markdown, sources }) + "\n",
  );
}
await writeFile(
  "assets/data/catalog.json",
  JSON.stringify({ modules, exercises }, null, 2) + "\n",
);
await Promise.all([
  copyFile("node_modules/marked/lib/marked.esm.js", "assets/vendor/marked.mjs"),
  copyFile("node_modules/marked/LICENSE", "assets/vendor/marked-LICENSE.txt"),
  copyFile(
    "node_modules/dompurify/dist/purify.es.mjs",
    "assets/vendor/purify.mjs",
  ),
  copyFile(
    "node_modules/dompurify/LICENSE",
    "assets/vendor/purify-LICENSE.txt",
  ),
  copyFile(
    "node_modules/@fontsource-variable/inter/files/inter-latin-wght-normal.woff2",
    "assets/fonts/inter-latin-variable.woff2",
  ),
  copyFile(
    "node_modules/@fontsource-variable/inter/LICENSE",
    "assets/fonts/inter-LICENSE.txt",
  ),
]);
console.log(
  `Praktika built: ${modules.length} modules, ${exercises.length} practices, local content and fonts.`,
);
