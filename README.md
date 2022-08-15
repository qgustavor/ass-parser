# ass-parser

Parse SSA/ASS subtitle format. Forked from [eush77/ass-parser](https://github.com/eush77/ass-parser).

## Changes:

- All dependencies replaced with native modern JavaScript functions.
- ES Modules instead of CommonJS.

## Demo

[https://codepen.io/qgustavor/full/YzaRXeX](https://codepen.io/qgustavor/full/YzaRXeX)

## API

### `assParser(text, [options])`

Returns the parse tree.

Comments are ignored unless `options.comments` is set.

| Option   | Type    | Required? | Default |
| :------- | :------ | :-------: | :------ |
| comments | boolean | No        | `false` |

## Format

Subtitle is a list of sections, each of them has `section` and `body` properties. The `body` is a list of key-value bindings (descriptors), with `key` and `value` properties (`type === 'comment'` and `value` for comments).

`value` can be one of the following:

- array if the descriptor key is `"Format"`;
- object if there is a `"Format"` descriptor above in the section;
- string otherwise.

## References

- [Wikipedia page](http://en.wikipedia.org/wiki/SubStation_Alpha)
- [Format specification](http://www.perlfu.co.uk/projects/asa/ass-specs.doc)

## Related

- [@qgustavor/ass-stringify](https://www.npmjs.com/packages/@qgustavor/ass-stringify) - stringify SSA/ASS parse tree.

## Install

```shell
npm install @qgustavor/ass-parser
```

## License

MIT
