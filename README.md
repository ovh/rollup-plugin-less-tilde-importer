# rollup-plugin-less-tilde-importer

> A rollup plugin providing ~ (tilde) prefix as a way to tell less compiler that it should resolve path using a configured array of module directories.

:warning: This plugin is now deprecated. Please refer to [rollup-plugin-styles](https://github.com/Anidetrix/rollup-plugin-styles).

## Install

```sh
$ yarn add -D @ovh-ux/rollup-plugin-less-tilde-importer
```

## Usage

```js
// rollup.config.js
import less from 'rollup-plugin-less';
import lessTildeImporter from '@ovh-ux/rollup-plugin-less-tilde-importer';
import path from 'path';

export default {
  input: 'src/index.js',
  output: {
    dir: 'dist',
    format: 'cjs',
    sourcemap: true,
  },
  plugins: [
    lessTildeImporter({
      paths: [
        path.resolve(__dirname, './node_modules'),
        path.resolve(__dirname, '../../node_modules'),
      ],
    }),
    less(),
  ],
};
```

## Related

- [@ovh-ux/rollup-plugin-less-inject](https://github.com/ovh/rollup-plugin-less-inject) - Inject Less files as CSS into HTML document's head.

See more: https://github.com/rollup/plugins.

## Contributing

Always feel free to help out! Whether it's [filing bugs and feature requests](https://github.com/ovh/rollup-plugin-less-tilde-importer/issues/new) or working on some of the [open issues](https://github.com/ovh/rollup-plugin-less-tilde-importer/issues), our [contributing guide](CONTRIBUTING.md) will help get you started.

## License

[BSD-3-Clause](LICENSE) © OVH SAS
