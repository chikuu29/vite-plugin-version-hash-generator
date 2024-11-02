import * as fs from 'fs';
import * as path from 'path';
import { Plugin } from 'vite';
import { OutputBundle, PluginContext } from 'rollup';

// Function to generate a random version string
function generateRandomVersion() {
  return `v${Math.floor(Math.random() * 10000)}.${Math.floor(Math.random() * 100)}.${Math.floor(Math.random() * 100)}`;
}

function ViteVersionHashMapGenerator(): Plugin {
  console.log("Initializing version plugin");

  const randomVersion = generateRandomVersion(); // Generate version once

  return {
    name: 'vite-plugin-version-hash-generator',
    enforce: 'post',
    apply: 'build',
    generateBundle(this: PluginContext, options: any, bundle: OutputBundle) { // Improved typing for generateBundle
      console.log(`Replacing placeholder with version: ${randomVersion}`);

      // Iterate over the bundle to replace placeholders in JS files
      for (const fileName in bundle) {
        const chunk = bundle[fileName];

        // Only proceed if the current file is a chunk and contains code
        if (chunk.type === 'chunk' && 'code' in chunk && chunk.code && !fileName.includes('node_modules')) {
          chunk.code = chunk.code.replace(/{{HASH_PLACEHOLDER}}/g, randomVersion);
        }
      }

      // Write version to a JSON file in the dist folder
      const versionFilePath = path.join(process.cwd(), 'dist/version.json');
      const versionContent = JSON.stringify({ version: randomVersion }, null, 2);

      // Write the version.json file to dist
      fs.writeFileSync(versionFilePath, versionContent, 'utf-8');
      console.log(`Version file created at ${versionFilePath} with version ${randomVersion}.`);
    },
  };
}

export { ViteVersionHashMapGenerator };
