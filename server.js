// Minimal zero-dependency static server for Nine Store.
// Browsers block fetch() and downloads on file://, so the store must run over http://.
const http = require("http");
const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");

const root = __dirname;
const firstPort = 8000;

const mimeTypes = {
    ".html": "text/html; charset=utf-8",
    ".htm": "text/html; charset=utf-8",
    ".css": "text/css; charset=utf-8",
    ".js": "text/javascript; charset=utf-8",
    ".mjs": "text/javascript; charset=utf-8",
    ".json": "application/json; charset=utf-8",
    ".svg": "image/svg+xml",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".gif": "image/gif",
    ".webp": "image/webp",
    ".bmp": "image/bmp",
    ".ico": "image/x-icon",
    ".zip": "application/zip",
    ".rar": "application/vnd.rar",
    ".7z": "application/x-7z-compressed",
    ".exe": "application/octet-stream",
    ".msi": "application/octet-stream",
    ".woff": "font/woff",
    ".woff2": "font/woff2",
    ".ttf": "font/ttf"
};

const server = http.createServer((req, res) => {
    let requestPath = "/";
    try {
        requestPath = decodeURIComponent(new URL(req.url, "http://localhost").pathname);
    } catch (error) {
        res.writeHead(400, { "Content-Type": "text/plain; charset=utf-8" });
        res.end("Bad request");
        return;
    }

    if (requestPath.endsWith("/")) requestPath += "index.html";

    const filePath = path.normalize(path.join(root, requestPath));
    if (!filePath.startsWith(root)) {
        res.writeHead(403, { "Content-Type": "text/plain; charset=utf-8" });
        res.end("Forbidden");
        return;
    }

    fs.stat(filePath, (error, stats) => {
        if (error || !stats.isFile()) {
            res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
            res.end("Not found");
            return;
        }

        res.writeHead(200, {
            "Content-Type": mimeTypes[path.extname(filePath).toLowerCase()] || "application/octet-stream",
            "Content-Length": stats.size,
            "Cache-Control": "no-store"
        });

        if (req.method === "HEAD") {
            res.end();
            return;
        }

        fs.createReadStream(filePath).on("error", () => res.destroy()).pipe(res);
    });
});

function listen(port, attemptsLeft) {
    server.once("error", error => {
        if (error.code === "EADDRINUSE" && attemptsLeft > 0) {
            listen(port + 1, attemptsLeft - 1);
            return;
        }
        console.error("Could not start the server:", error.message);
        process.exit(1);
    });

    server.listen(port, "127.0.0.1", () => {
        const url = `http://localhost:${port}/`;
        console.log("");
        console.log("  Nine Store is running at:  " + url);
        console.log("  Keep this window open while you use the store.");
        console.log("  Close it (or press Ctrl+C) when you are done.");
        console.log("");
        exec(`start "" "${url}"`);
    });
}

listen(firstPort, 10);
