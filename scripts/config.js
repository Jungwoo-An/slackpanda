const path = require('path');

const { nodeResolve } = require('@rollup/plugin-node-resolve');
const { terser } = require('rollup-plugin-terser');
const vue = require('rollup-plugin-vue');
const typescript = require('rollup-plugin-typescript2');

const DEFUALT_ROLLUP_PLUGINS = [vue(), typescript(), nodeResolve(), terser()];

function createRollupConfig(packageDir) {
  return {
    input: path.resolve(`./${packageDir}`, 'src/index.ts'),
    output: [
      {
        format: 'cjs',
        sourcemap: true,
        file: path.resolve(
          `./${packageDir}`,
          'dist',
          `${path.basename(packageDir)}.js`
        ),
      },
    ],
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
  };
}

module.exports = {
  createRollupConfig,
};
