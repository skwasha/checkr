# skwasha:checkr

A Meteor wrapper for the Checkr API via checkr-api.

## Dependencies

 * [checkr-api](https://github.com/shrav/checkr-node) - A node.js
wrapper for the Checkr API


## TL;DR;

_skwasha:checkr_ exposes [Checkr API v1](https://checkr.io/docs) features to your Meteor application.

## Installation

Install using Meteor:

```sh
meteor add skwasha:checkr
```

## Quick Start

Put in your server's settings.json:

```javascript
{
	"private": {
		"Checkr": {
			"apiKey": "<Your Checkr API Key>"
		}
	}
}
```

and start your server with:

```sh
meteor --settings settings.json
```

## API

All of the API categories and methods described in the [Checkr API 
Documentation](https://checkr.io/docs) are available in this
wrapper ** server-side only **.


## Examples

### Callback, server-side/client-side

Note: The example is using the meteorhacks:async package to wrap calls.

```javascript

Meteor.methods({
  'getCandidates': function getCandidates() {
    var candidates = Async.runSync(function(done) {
      Checkr.candidates.list(function(err, res) {
        done(null, res);
        console.log(res);
      });
    });

    return candidates.data;
  }
}
```

### wrapAsync, server-side ONLY

```javascript
// You can pass different parameters on each call

var result = Checkr.call( 'candidates', 'list', {
	start: 0,
	limit: 25
});

// Do something with your data!
console.info( '[Checkr][candidates][list]: %o', result );
```

## Changelog

### v0.1.0
 * Initial release

## Copyright and license

Copyright © 2015 Sascha Linn

_skwasha:checkr_ is licensed under the [**MIT**](http://sascha.mit-license.org) license.