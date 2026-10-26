#!/usr/bin/env node
// Genera una web estática, minimalista, a partir de los boletines de docs/.
//
// Estructura admitida (se pueden mezclar):
//   docs/boletin1/boletin1.md + imágenes     (una carpeta por boletín)
//   docs/boletin6.md                         (un .md suelto)
//
// Uso (desde la raíz del repositorio):
//   npm install marked        # solo la primera vez
//   node docs/build-site.mjs
//
// Salida en docs/site/:
//   boletin1/boletin1.html (+ imágenes copiadas), ..., index.html

import { readdir, readFile, writeFile, mkdir, cp, rm } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { marked } from "marked";

const DOCS_DIR = path.dirname(fileURLToPath(import.meta.url));
const SITE_DIR = path.join(DOCS_DIR, "site");
const IGNORED_DIRS = new Set(["site", "node_modules"]);
const SITE_NAME = "Memoria de las prácticas";

const CSS = `
:root {
  --bg: #fcfcfb;
  --fg: #1c1c1e;
  --muted: #6b6b70;
  --line: #e6e6e3;
  --soft: #f3f3f0;
  --accent: #3b5bdb;
  --font: "Inter", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
  --mono: ui-monospace, "SF Mono", "JetBrains Mono", Menlo, Consolas, monospace;
}
@media (prefers-color-scheme: dark) {
  :root {
    --bg: #131315;
    --fg: #e8e8ea;
    --muted: #9a9aa2;
    --line: #2a2a2e;
    --soft: #1b1b1e;
    --accent: #8ea2ff;
  }
}
* { box-sizing: border-box; }
html { -webkit-text-size-adjust: 100%; }
body {
  margin: 0;
  background: var(--bg);
  color: var(--fg);
  font: 17px/1.7 var(--font);
  -webkit-font-smoothing: antialiased;
}
a { color: var(--accent); text-decoration-thickness: 1px; text-underline-offset: 3px; }
a:hover { text-decoration-thickness: 2px; }

.wrap { max-width: 700px; margin: 0 auto; padding: 0 1.5rem; }
header.site { padding: 2rem 0 1.25rem; }
header.site a {
  color: var(--muted); text-decoration: none; font-size: .9rem; letter-spacing: .01em;
}
header.site a:hover { color: var(--fg); }
main { padding: 1.5rem 0 3rem; }
footer.site {
  border-top: 1px solid var(--line); padding: 1.5rem 0 3rem;
  color: var(--muted); font-size: .85rem;
}

/* Tipografía del contenido */
h1, h2, h3, h4 { line-height: 1.25; letter-spacing: -.02em; font-weight: 650; }
h1 { font-size: 2.25rem; margin: 0 0 1.5rem; letter-spacing: -.03em; }
h2 { font-size: 1.5rem; margin: 3rem 0 .75rem; }
h3 { font-size: 1.2rem; margin: 2.25rem 0 .5rem; }
h4 { font-size: 1rem; margin: 1.75rem 0 .5rem; }
p, ul, ol, pre, table, blockquote, figure { margin: 0 0 1.25rem; }
ul, ol { padding-left: 1.4rem; }
li + li { margin-top: .3rem; }
hr { border: 0; border-top: 1px solid var(--line); margin: 2.5rem 0; }
strong { font-weight: 600; }

/* Código */
code { font-family: var(--mono); font-size: .88em; }
:not(pre) > code {
  background: var(--soft); border: 1px solid var(--line);
  padding: .1em .4em; border-radius: 5px;
}
pre {
  background: var(--soft); border: 1px solid var(--line);
  padding: 1rem 1.15rem; border-radius: 10px; overflow-x: auto;
  font-size: .88rem; line-height: 1.6;
}
pre code { background: none; border: 0; padding: 0; font-size: inherit; }

/* Imágenes, citas, tablas */
img { display: block; max-width: 100%; height: auto; border-radius: 10px; margin: 1.5rem 0; }
blockquote {
  margin-left: 0; padding: .1rem 0 .1rem 1.1rem;
  border-left: 3px solid var(--line); color: var(--muted);
}
table { width: 100%; border-collapse: collapse; font-size: .95rem; display: block; overflow-x: auto; }
th, td { text-align: left; padding: .55rem .8rem; border-bottom: 1px solid var(--line); }
th { font-weight: 600; color: var(--muted); font-size: .8rem; text-transform: uppercase; letter-spacing: .04em; }

/* Índice */
.lead { color: var(--muted); margin: -.75rem 0 2.5rem; }
.toc { list-style: none; padding: 0; margin: 0; border-top: 1px solid var(--line); }
.toc li { margin: 0; }
.toc a {
  display: flex; align-items: baseline; gap: 1rem; padding: 1rem .25rem;
  border-bottom: 1px solid var(--line); color: var(--fg); text-decoration: none;
  transition: padding .15s ease, color .15s ease;
}
.toc a:hover { padding-left: .75rem; color: var(--accent); }
.toc .num { font: .85rem var(--mono); color: var(--muted); min-width: 2ch; }
.toc .arrow { margin-left: auto; color: var(--muted); }

/* Anterior / siguiente */
.pager { display: flex; justify-content: space-between; gap: 1rem; margin-top: 3.5rem; }
.pager a {
  flex: 1; display: block; padding: .9rem 1.1rem; border: 1px solid var(--line);
  border-radius: 10px; text-decoration: none; color: var(--fg); transition: border-color .15s;
}
.pager a:hover { border-color: var(--accent); }
.pager small { display: block; color: var(--muted); font-size: .75rem; letter-spacing: .04em; text-transform: uppercase; }
.pager .next { text-align: right; }

@media (max-width: 600px) {
  body { font-size: 16px; }
  h1 { font-size: 1.85rem; }
}
`;

const escapeHtml = (s) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function page({ title, body, rootHref }) {
  return `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${escapeHtml(title)}</title>
<style>${CSS}</style>
</head>
<body>
<div class="wrap">
  <header class="site">${rootHref ? `<a href="${rootHref}">← ${SITE_NAME}</a>` : "<a>&nbsp;</a>"}</header>
  <main>
${body}
  </main>
  <footer class="site">${SITE_NAME}</footer>
</div>
</body>
</html>
`;
}

// Título = primer encabezado "# ..." o, si no hay, el nombre del fichero.
function extractTitle(md, fallback) {
  const m = md.match(/^#\s+(.+)$/m);
  return m ? m[1].trim() : fallback;
}

// Los enlaces a otros .md pasan a apuntar a .html.
function rewriteMdLinks(html) {
  return html.replace(/href="(?!https?:|#|mailto:)([^"]+?)\.md(#[^"]*)?"/g, 'href="$1.html$2"');
}

const collator = new Intl.Collator("es", { numeric: true });
const isMd = (f) => f.toLowerCase().endsWith(".md");

// Devuelve [{ relDir, file }]: relDir "" para .md sueltos, o el nombre de la carpeta.
async function collectSources() {
  const items = await readdir(DOCS_DIR, { withFileTypes: true });
  const sources = [];
  for (const it of items) {
    if (it.isFile() && isMd(it.name)) {
      sources.push({ relDir: "", file: it.name });
    } else if (it.isDirectory() && !IGNORED_DIRS.has(it.name) && !it.name.startsWith(".")) {
      const inner = await readdir(path.join(DOCS_DIR, it.name));
      for (const f of inner.filter(isMd)) sources.push({ relDir: it.name, file: f });
    }
  }
  return sources.sort((a, b) =>
    collator.compare(path.join(a.relDir, a.file), path.join(b.relDir, b.file))
  );
}

// Enlace relativo desde la carpeta de una página a otra ruta del sitio.
const hrefFrom = (fromDir, toRel) => encodeURI(path.posix.relative(fromDir || ".", toRel));

async function main() {
  const sources = await collectSources();
  if (sources.length === 0) {
    console.error("No se encontraron ficheros .md en", DOCS_DIR);
    process.exit(1);
  }

  // Salida limpia en cada ejecución
  await rm(SITE_DIR, { recursive: true, force: true });
  await mkdir(SITE_DIR, { recursive: true });

  // Copiar cada carpeta de boletín (imágenes y demás) sin los .md
  const dirs = [...new Set(sources.map((s) => s.relDir).filter(Boolean))];
  for (const dir of dirs) {
    await cp(path.join(DOCS_DIR, dir), path.join(SITE_DIR, dir), {
      recursive: true,
      filter: (src) => !isMd(src),
    });
  }

  // Primera pasada: leer y convertir todo
  const entries = [];
  for (const { relDir, file } of sources) {
    const name = path.basename(file, path.extname(file));
    const md = await readFile(path.join(DOCS_DIR, relDir, file), "utf8");
    entries.push({
      relDir,
      file,
      title: extractTitle(md, name),
      outRel: path.posix.join(relDir, `${name}.html`),
      html: rewriteMdLinks(await marked.parse(md)),
    });
  }

  // Segunda pasada: escribir con navegación anterior / siguiente
  for (const [i, e] of entries.entries()) {
    const prev = entries[i - 1];
    const next = entries[i + 1];
    const pager =
      prev || next
        ? `<nav class="pager">
  ${prev ? `<a class="prev" href="${hrefFrom(e.relDir, prev.outRel)}"><small>← Anterior</small>${escapeHtml(prev.title)}</a>` : "<span></span>"}
  ${next ? `<a class="next" href="${hrefFrom(e.relDir, next.outRel)}"><small>Siguiente →</small>${escapeHtml(next.title)}</a>` : "<span></span>"}
</nav>`
        : "";

    await mkdir(path.join(SITE_DIR, e.relDir), { recursive: true });
    await writeFile(
      path.join(SITE_DIR, e.outRel),
      page({
        title: `${e.title} · ${SITE_NAME}`,
        body: `<article>\n${e.html}\n</article>\n${pager}`,
        rootHref: hrefFrom(e.relDir, "index.html"),
      })
    );
    console.log(`✔ ${path.join(e.relDir, e.file)} → site/${e.outRel}`);
  }

  // Índice
  const list = entries
    .map(
      (e, i) =>
        `    <li><a href="${encodeURI(e.outRel)}"><span class="num">${String(i + 1).padStart(2, "0")}</span><span>${escapeHtml(e.title)}</span><span class="arrow">→</span></a></li>`
    )
    .join("\n");
  await writeFile(
    path.join(SITE_DIR, "index.html"),
    page({
      title: SITE_NAME,
      body: `<h1>${SITE_NAME}</h1>\n<p class="lead">Una entrada por sesión.</p>\n<ol class="toc">\n${list}\n</ol>`,
      rootHref: null,
    })
  );
  console.log("✔ site/index.html");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
