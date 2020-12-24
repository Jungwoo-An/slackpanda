const path = require('path');

const { rollup } = require('rollup');
const { nodeResolve } = require('@rollup/plugin-node-resolve');
const vue = require('rollup-plugin-vue');
const typescript = require('rollup-plugin-typescript2');

const packageJSON = require('../package.json');

const { getWorkspacePackages } = require('./utils');

const DEFUALT_ROLLUP_PLUGINS = [vue(), typescript(), nodeResolve()];

async function build(packageDir) {
  const filename = path.basename(packageDir);

  const { build: canBuild } = require(`../${packageDir}/package.json`);
  if (canBuild === false) {
    return;
  }

  const compiler = await rollup({
    input: path.resolve(`./${packageDir}`, 'src/index.ts'),
    plugins: [...DEFUALT_ROLLUP_PLUGINS],
    external: [
      'events',
      'vue',
      '@slack/web-api',
      '@slack/interactive-messages',
      '@vue/runtime-core',
    ],
    onwarn(warning, handler) {
      if (warning.code === 'CIRCULAR_DEPENDENCY') {
        return;
      }

      handler(warning);
    },
  });

  compiler.write({
    file: path.resolve(`./${packageDir}`, 'dist', `${filename}.js`),
    format: 'cjs',
  });
}

(async () => {
  const packages = await getWorkspacePackages(packageJSON.workspaces || []);

  packages.forEach(build);
})();
