import { defineConfig } from "astro/config";
import { unified } from "@astrojs/markdown-remark";
import UnoCSS from "@unocss/astro";
import remarkToc from "remark-toc";

export default defineConfig({
  site: "https://dlut-sss.github.io",
  compressHTML: true,
  integrations: [
    UnoCSS({
      injectReset: true,
    }),
  ],
  markdown: {
    processor: unified({
      remarkPlugins: [[remarkToc, { heading: "目录", maxDepth: 3 }]],
    }),
  },
});
