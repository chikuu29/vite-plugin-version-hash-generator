import * as fs from "fs";
import * as path from "path";
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
      const versionFilePath = path.join(process.cwd(), "dist/version.json");
      const versionContent = JSON.stringify({ version: randomVersion }, null, 2);
      fs.writeFileSync(versionFilePath, versionContent, "utf-8");
      console.log(`Version file created at ${versionFilePath} with version ${randomVersion}.`);
    }
  };
}
export {
  ViteVersionHashMapGenerator
};
