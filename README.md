# nosqldbm-converter

[![NPM version][npm-version-image]][npm-url]
[![NPM downloads][npm-downloads-image]][npm-downloads-url]
[![MIT License][license-image]][license-url]
[![FOSSA Status][fossa-badge-image]][fossa-badge-url]

Convert https://nosqldbm.ru/ JSON data to Mongoose Schema.

# Getting started
1. Design your database on https://nosqldbm.ru/.
2. View JSON and Copy clipboard.
3. Save it as a file raw.json.
4. Load your schemas.

    ```js
    const nosqldbmConverter = require('nosqldbm-converter')
    const rawJSON = require('./raw.json');

    console.log(nosqldbmConverter(rawJSON));
    ```

# License
This package is freely distributable under the terms of the [MIT license](https://github.com/vovikhangcdv/nosqldbm-converter/blob/main/LICENSE).

[![FOSSA Status][fossa-large-image]][fossa-large-url]

[license-image]: https://img.shields.io/badge/license-MIT-blue.svg?style=flat
[license-url]: LICENSE

[npm-url]: https://npmjs.org/package/nosqldbm-converter
[npm-version-image]: https://img.shields.io/npm/v/nosqldbm-converter.svg?style=flat

[npm-downloads-image]: https://img.shields.io/npm/dm/nosqldbm-converter.svg?style=flat
[npm-downloads-url]: https://app.fossa.com/projects/git%2Bgithub.com%2Fvovikhangcdv%2Fnosqldbm-converter?ref=badge_large

[fossa-badge-image]: https://app.fossa.com/api/projects/git%2Bgithub.com%2Fvovikhangcdv%2Fnosqldbm-converter.svg?type=shield
[fossa-badge-url]: https://app.fossa.com/projects/git%2Bgithub.com%2Fvovikhangcdv%2Fnosqldbm-converter?ref=badge_shield

[fossa-large-image]: https://app.fossa.com/api/projects/git%2Bgithub.com%2Fvovikhangcdv%2Fnosqldbm-converter.svg?type=large
[fossa-large-url]: https://app.fossa.com/projects/git%2Bgithub.com%2Fvovikhangcdv%2Fnosqldbm-converter?ref=badge_large
