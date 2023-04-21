# ass-parser

Parse SSA/ASS subtitle format. Forked from [eush77/ass-parser](https://github.com/eush77/ass-parser).

## Changes:

- All dependencies replaced with native modern JavaScript functions.
- ES Modules instead of CommonJS.
- Add `detectStringifyOptions` helper function.

## Demo

[https://codepen.io/qgustavor/full/YzaRXeX](https://codepen.io/qgustavor/full/YzaRXeX)

## API

### `assParser(text, [options])`

Default export. Returns the parse tree.

Comments are ignored unless `options.comments` is set.

| Option          | Type    | Required? | Default |
| :-------------- | :------ | :-------: | :------ |
| comments        | boolean | No        | `false` |
| parseTimestamps | boolean | No        | `false` |

## Format

Subtitle is a list of sections, each of them has `section`, `body` and `line` properties. The `body` is a list of key-value bindings (descriptors), with `key`, `value` and `line` properties (`type === 'comment'` and `value` for comments).

`value` can be one of the following:

- array if the descriptor key is `"Format"`;
- object if there is a `"Format"` descriptor above in the section;
- string otherwise.

When `parseTimestamps` is set to `true` timestamps on `Start` and `End` keys for `Dialogue` and `Comment` lines will be converted into numbers (in seconds).

At the moment override tags are not parsed. One alternative is parsing using [libjass](https://github.com/Arnavion/libjass/) like so: `libjass.parser.parse(descriptor.value.Text, 'dialogueParts')`.

The `line` property in sections and descriptors refer to the 0-indexed line where the section or descriptor was defined in the text.

### `detectStringifyOptions(text)`

Named export. Returns an options object to be passed to `stringify` in order to parse then stringify a subtitle with the minimal differences possible.

## References

- [Wikipedia page](http://en.wikipedia.org/wiki/SubStation_Alpha)
- [Format specification](http://www.perlfu.co.uk/projects/asa/ass-specs.doc)

## Related

- [@qgustavor/ass-stringify](https://www.npmjs.com/package/@qgustavor/ass-stringify) - stringify SSA/ASS parse tree.

## Install

```shell
npm install @qgustavor/ass-parser
```

## License

MIT
