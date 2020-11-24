const path = require('path');

const glob = require('glob-promise');

exports.getWorkspacePackages = async (workspaces) => {
  const result = await Promise.all(
    workspaces.map((workspace) => glob(workspace, { cwd: path.resolve('./') }))
  );

  return result.reduce((acc, paths) => [...acc, ...paths], []);
};
