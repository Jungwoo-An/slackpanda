const { rollup, watch } = require('rollup');

const packageJSON = require('../../package.json');

const { getWorkspacePackages } = require('../utils');
const { createRollupConfig } = require('../config');
const { error, done, info } = require('../logger');

(async () => {
  const packages = await getWorkspacePackages(packageJSON.workspaces || []);

  const configs = packages
    .filter((packageDir) => {
      const { build: canBuild } = require(`../../${packageDir}/package.json`);

      return canBuild !== false;
    })
    .map(createRollupConfig);

  info(
    `bundles ${packages.join(', ')} → ${configs
      .map((config) => config.output.map(({ file }) => file).join(', '))
      .join(', ')}`
  );

  try {
    const startMs = Date.now();

    await Promise.all(
      configs.map(async (config) => {
        const compiler = await rollup(config);

        return Promise.all(config.output.map(compiler.write));
      })
    );

    done(
      `created ${configs
        .map((config) => config.output.map(({ file }) => file).join(', '))
        .join(', ')} in ${Date.now() - startMs}ms`
    );
  } catch (e) {
    error(e.message);
  }

  const watcher = watch(configs);
  watcher.on('event', (e) => {
    switch (e.code) {
      case 'ERROR':
        error(e.error.message);
        // eslint-disable-next-line no-console
        console.log(e.error.stack);
        break;

      case 'BUNDLE_START':
        info(`bundles ${e.input} → ${e.output.join(', ')}`);
        break;

      case 'END':
        done('waiting for changes...');
        break;

      default:
        break;
    }
  });
})();
