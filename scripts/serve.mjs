import http from "node:http";
import path from "node:path";
import { readFile, stat } from "node:fs/promises";
const root = process.cwd();
const port = Number(process.env.PORT || 4174);
const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".md": "text/plain; charset=utf-8",
  ".php": "text/plain; charset=utf-8",
  ".svg": "image/svg+xml",
  ".woff2": "font/woff2",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".txt": "text/plain; charset=utf-8",
};
http
  .createServer(async (req, res) => {
    try {
      const url = new URL(req.url, "http://localhost");
      const file = path.resolve(root, "." + decodeURIComponent(url.pathname));
      const relative = path.relative(root, file);
      if (
        relative.startsWith("..") ||
        path.isAbsolute(relative) ||
        relative
          .split(path.sep)
          .some((part) => part.startsWith(".") || part === "node_modules")
      ) {
        res.writeHead(403).end("Forbidden");
        return;
      }
      const target = (await stat(file)).isDirectory()
        ? path.join(file, "index.html")
        : file;
      const data = await readFile(target);
      res
        .writeHead(200, {
          "Content-Type":
            types[path.extname(target).toLowerCase()] ||
            "application/octet-stream",
          "X-Content-Type-Options": "nosniff",
          "Cache-Control": "no-cache",
        })
        .end(data);
    } catch {
      res
        .writeHead(404, { "Content-Type": "text/plain; charset=utf-8" })
        .end("File tidak ditemukan.");
    }
  })
  .listen(port, "127.0.0.1", () =>
    console.log(`Praktika ready at http://localhost:${port}`),
  );
