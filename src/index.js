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

export function getLinked(
  pkgPath = path.resovle(process.cwd(), 'package.json')
) {
  const pkg = require(pkgPath);
  const dependencies = _.concat(
    _.keys(pkg.devDependencies || {}),
    _.keys(pkg.dependencies || {})
  );
  return _.filter(dependencies, dependency => isLinked(dependency));
}

export function getLinkedPaths(pkgPath) {
  return _.map(getLinked(pkgPath), dependency => {
    return fs.realpathSync(getPath(dependency));
  });
}

export default { isLinked, getLinked, getLinkedPaths };
