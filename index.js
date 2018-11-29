const { createFilter } = require('rollup-pluginutils');
const fs = require('fs');
const MagicString = require('magic-string');
const path = require('path');

module.exports = (opts = {}) => {
  const include = opts.include || '**/*.less';
  const { exclude } = opts;
  const filter = createFilter(include, exclude);
  const filtering = opts.filtering !== false;
  const paths = opts.paths || ['./node_modules'];
  const sourcemap = opts.sourcemap !== false;
  return {
    name: 'less-tilde-importer',
    transform(code, id) {
      if (filtering && !filter(id)) return null;
      const magicString = new MagicString(code);
      const importRegex = /(@import[^'"]*['"]+)(~[^'"]+)(['"]+\s*;)/g;
      const hasExtensionRegex = /\.\w+$/;
      let match = importRegex.exec(code);

      while (match) {
        const matchString = match[0];
        const pathTried = [];
        let lessImport = match[2];
        let i;

        for (i = 0; i < paths.length; i += 1) {
          let absolutePath = path.resolve(path.join(paths[i], lessImport.replace(/^~/, '')));
          if (!hasExtensionRegex.test(absolutePath)) {
            absolutePath = `${absolutePath}.less`;
          }
          if (fs.existsSync(absolutePath)) {
            lessImport = absolutePath;
            break;
          }
          pathTried.push(absolutePath);
        }

        if (lessImport === match[2]) {
          throw new Error(`cannot resolve import '${lessImport}', tried:\n  ${pathTried.join('\n  ')}`);
        }

        magicString.overwrite(
          match.index,
          match.index + matchString.length,
          `${match[1]}${lessImport}${match[3]}`,
        );
        match = importRegex.exec(code);
      }
      return {
        code: magicString.toString(),
        map: sourcemap ? magicString.generateMap({ hires: true }) : null,
      };
    },
  };
};
