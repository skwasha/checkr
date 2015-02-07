Package.describe({
  name: 'skwasha:checkr',
  version: '0.0.1',
  summary: 'A Meteor wrapper for the Checkr.io API via checkr-api',
  git: '',
  author: 'Sascha Linn',
  documentation: 'README.md'
});

Npm.depends({'checkr-api': '1.0.1'});

Package.onUse(function(api) {
  api.versionsFrom('1.0.3.1');
  api.addFiles('lib/checkr.js', 'server');
  if ( api.export ) {
    api.export('Checkr');
  }
});
