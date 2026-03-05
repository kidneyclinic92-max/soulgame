/** @type {import('next').NextConfig} */
const path = require("path");

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
  webpack: (config, { isServer }) => {
    config.externals.push("pino-pretty", "lokijs", "encoding");

    // Fix @phosphor-icons/webcomponents (via Reown AppKit) resolving .pnpm paths that don't exist with npm
    const litPackages = [
      { pkg: "@lit/reactive-element", subpath: "" },
      { pkg: "lit-html", subpath: "" },
      { pkg: "lit-element", subpath: "" },
    ];
    config.resolve.alias = {
      ...config.resolve.alias,
      ...Object.fromEntries(
        litPackages.flatMap(({ pkg, subpath }) => {
          const dir = path.join(config.resolve.modules[0] || "node_modules", pkg, subpath);
          return [
            [pkg, dir],
            [path.join("node_modules", pkg), dir],
          ];
        })
      ),
    };

    // Rewrite requests that contain .pnpm/.../node_modules/<pkg> to node_modules/<pkg>
    const originalResolve = config.resolve.resolve || config.resolve;
    const rootDir = path.resolve(__dirname, "node_modules");
    config.resolve.plugins = config.resolve.plugins || [];
    config.resolve.plugins.push({
      apply(resolver) {
        const target = resolver.ensureHook("resolved");
        resolver
          .getHook("resolve")
          .tapAsync("RewritePnpmPaths", (request, context, callback) => {
            const req = request.request || request.path;
            if (typeof req === "string" && req.includes(".pnpm")) {
              const match = req.match(
                /(?:@lit\/reactive-element|lit-html|lit-element)(?:\/[\s\S]*)?$/
              );
              if (match) {
                const pkg = match[0].split("/")[0];
                const subpath = match[0].slice(pkg.length) || "";
                const newPath = path.join(rootDir, pkg, subpath.replace(/^\//, ""));
                const newRequest = { ...request, path: newPath, request: undefined };
                return resolver.doResolve(target, newRequest, null, context, callback);
              }
            }
            callback();
          });
      },
    });

    return config;
  },
};

module.exports = nextConfig;
