"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const fs = require("fs");
const path = require("path");
function _interopNamespaceDefault(e) {
  const n = Object.create(null, { [Symbol.toStringTag]: { value: "Module" } });
  if (e) {
    for (const k in e) {
      if (k !== "default") {
        const d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: () => e[k]
        });
      }
    }
  }
  n.default = e;
  return Object.freeze(n);
}
const fs__namespace = /* @__PURE__ */ _interopNamespaceDefault(fs);
const path__namespace = /* @__PURE__ */ _interopNamespaceDefault(path);
function generateRandomVersion() {
  return `v${Math.floor(Math.random() * 1e4)}.${Math.floor(Math.random() * 100)}.${Math.floor(Math.random() * 100)}`;
}
function ViteVersionHashMapGenerator() {
  console.log("Initializing version plugin");
  const randomVersion = generateRandomVersion();
  return {
    name: "vite-plugin-version-hash-generator",
    enforce: "post",
    apply: "build",
    generateBundle(options, bundle) {
      console.log(`Replacing placeholder with version: ${randomVersion}`);
      for (const fileName in bundle) {
        const chunk = bundle[fileName];
        if (chunk.type === "chunk" && "code" in chunk && chunk.code && !fileName.includes("node_modules")) {
          chunk.code = chunk.code.replace(/{{HASH_PLACEHOLDER}}/g, randomVersion);
        }
      }
      const versionFilePath = path__namespace.join(process.cwd(), "dist/version.json");
      const versionContent = JSON.stringify({ version: randomVersion }, null, 2);
      fs__namespace.writeFileSync(versionFilePath, versionContent, "utf-8");
      console.log(`Version file created at ${versionFilePath} with version ${randomVersion}.`);
    }
  };
}
exports.ViteVersionHashMapGenerator = ViteVersionHashMapGenerator;
