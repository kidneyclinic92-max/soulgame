/** @type {import('next').NextConfig} */
const path = require("path");

const nm = path.resolve(__dirname, "node_modules");

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

    // @phosphor-icons/webcomponents (pulled in by Reown AppKit) imports
    // @lit/reactive-element, lit-html, lit-element with .mjs extensions,
    // but the installed packages only have .js files.
    // Map every .mjs import to its .js counterpart.
    config.resolve.alias = {
      ...config.resolve.alias,

      // @lit/reactive-element  ──  top-level .mjs → .js
      [path.join(nm, "@lit", "reactive-element", "reactive-element.mjs")]:
        path.join(nm, "@lit", "reactive-element", "reactive-element.js"),
      [path.join(nm, "@lit", "reactive-element", "css-tag.mjs")]:
        path.join(nm, "@lit", "reactive-element", "css-tag.js"),

      // @lit/reactive-element/decorators/*.mjs → *.js
      [path.join(nm, "@lit", "reactive-element", "decorators", "custom-element.mjs")]:
        path.join(nm, "@lit", "reactive-element", "decorators", "custom-element.js"),
      [path.join(nm, "@lit", "reactive-element", "decorators", "property.mjs")]:
        path.join(nm, "@lit", "reactive-element", "decorators", "property.js"),
      [path.join(nm, "@lit", "reactive-element", "decorators", "event-options.mjs")]:
        path.join(nm, "@lit", "reactive-element", "decorators", "event-options.js"),
      [path.join(nm, "@lit", "reactive-element", "decorators", "base.mjs")]:
        path.join(nm, "@lit", "reactive-element", "decorators", "base.js"),
      [path.join(nm, "@lit", "reactive-element", "decorators", "query-all.mjs")]:
        path.join(nm, "@lit", "reactive-element", "decorators", "query-all.js"),

      // lit-html .mjs → .js
      [path.join(nm, "lit-html", "lit-html.mjs")]:
        path.join(nm, "lit-html", "lit-html.js"),
      [path.join(nm, "lit-html", "directive.mjs")]:
        path.join(nm, "lit-html", "directive.js"),
      [path.join(nm, "lit-html", "directive-helpers.mjs")]:
        path.join(nm, "lit-html", "directive-helpers.js"),
      [path.join(nm, "lit-html", "async-directive.mjs")]:
        path.join(nm, "lit-html", "async-directive.js"),
      [path.join(nm, "lit-html", "static.mjs")]:
        path.join(nm, "lit-html", "static.js"),
      [path.join(nm, "lit-html", "is-server.mjs")]:
        path.join(nm, "lit-html", "is-server.js"),

      // lit-element .mjs → .js
      [path.join(nm, "lit-element", "lit-element.mjs")]:
        path.join(nm, "lit-element", "lit-element.js"),
      [path.join(nm, "lit-element", "decorators.mjs")]:
        path.join(nm, "lit-element", "decorators.js"),
    };

    // Catch-all: rewrite any .mjs that webpack can't find in these packages to .js
    config.resolve.plugins = config.resolve.plugins || [];
    config.resolve.plugins.push({
      apply(resolver) {
        resolver
          .getHook("raw-file")
          .tapAsync("MjsToJs", (request, ctx, callback) => {
            const p = request.path;
            if (
              typeof p === "string" &&
              p.endsWith(".mjs") &&
              (p.includes("@lit") || p.includes("lit-html") || p.includes("lit-element"))
            ) {
              const jsPath = p.slice(0, -4) + ".js";
              const fs = resolver.fileSystem;
              fs.stat(p, (err) => {
                if (err) {
                  // .mjs doesn't exist, try .js
                  const newRequest = { ...request, path: jsPath, relativePath: request.relativePath && request.relativePath.replace(/\.mjs$/, ".js") };
                  resolver.doResolve(
                    resolver.ensureHook("raw-file"),
                    newRequest,
                    "rewrite .mjs to .js for lit packages",
                    ctx,
                    callback
                  );
                } else {
                  callback();
                }
              });
            } else {
              callback();
            }
          });
      },
    });

    return config;
  },
};

module.exports = nextConfig;
