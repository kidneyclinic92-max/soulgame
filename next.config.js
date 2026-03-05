/** @type {import('next').NextConfig} */
const webpack = require("webpack");

// Map subpaths that aren't in the package "exports" to their correct specifier.
// e.g. @lit/reactive-element/reactive-element.js → @lit/reactive-element (main export)
const mainEntryRewrites = {
  "@lit/reactive-element/reactive-element.js": "@lit/reactive-element",
  "@lit/reactive-element/reactive-element.mjs": "@lit/reactive-element",
  "lit-html/lit-html.js": "lit-html",
  "lit-html/lit-html.mjs": "lit-html",
  "lit-element/lit-element.js": "lit-element",
  "lit-element/lit-element.mjs": "lit-element",
};

const nextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  webpack: (config) => {
    config.externals.push("pino-pretty", "lokijs", "encoding");

    // @phosphor-icons/webcomponents (pulled in by Reown AppKit) was published
    // with hardcoded pnpm-style relative imports like:
    //   ../../../node_modules/.pnpm/@lit_reactive-element@2.0.4/node_modules/@lit/reactive-element/reactive-element.mjs
    // These paths don't exist when installed with npm. Rewrite them to normal
    // package imports and fix .mjs → .js for lit packages.
    config.plugins.push(
      new webpack.NormalModuleReplacementPlugin(
        /\.pnpm/,
        (resource) => {
          const req = resource.request;
          if (!req || !req.includes(".pnpm")) return;

          const match = req.match(
            /\.pnpm\/[^/]+\/node_modules\/(.+)/
          );
          if (match) {
            let resolved = match[1];
            // .mjs → .js for lit packages
            if (
              resolved.endsWith(".mjs") &&
              (resolved.includes("@lit/") ||
                resolved.includes("lit-html") ||
                resolved.includes("lit-element"))
            ) {
              resolved = resolved.slice(0, -4) + ".js";
            }
            // Rewrite main entry files that aren't in the exports map
            if (mainEntryRewrites[resolved]) {
              resolved = mainEntryRewrites[resolved];
            }
            resource.request = resolved;
          }
        }
      )
    );

    return config;
  },
};

module.exports = nextConfig;
