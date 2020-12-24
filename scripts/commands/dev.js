const { rollup, watch } = require('rollup');

const packageJSON = require('../../package.json');

const { getWorkspacePackages } = require('../utils');
const { createRollupConfig } = require('../config');

(async () => {
  const packages = await getWorkspacePackages(packageJSON.workspaces || []);

  const configs = packages
    .filter((packageDir) => {
      const { build: canBuild } = require(`../../${packageDir}/package.json`);

      return canBuild !== false;
    })
    .map(createRollupConfig);

  await Promise.all(
    configs.map(async (config) => {
      const compiler = await rollup(config);

      return Promise.all(config.output.map(compiler.write));
    })
  );

  watch(configs);
})();
