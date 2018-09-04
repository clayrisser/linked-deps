import path from 'path';
import fs from 'fs-extra';
import _ from 'lodash';

function getPath(dependency) {
  return path.join(process.cwd(), 'node_modules', dependency);
}

export function isLinked(dependency) {
  const dependencyPath = getPath(dependency);
  const stats = fs.lstatSync(dependencyPath);
  return stats.isSymbolicLink();
}

export function getLinked(pkg = require('../package.json')) {
  const dependencies = _.concat(
    _.keys(pkg.devDependencies || {}),
    _.keys(pkg.dependencies || {})
  );
  _.filter(dependencies, dependency => isLinked(dependency));
}

export function getLinkedPaths(pkg = {}) {
  return _.each(getLinked(pkg), getPath);
}
