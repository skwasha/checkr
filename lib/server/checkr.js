if (Meteor.settings && Meteor.settings.private && Meteor.settings.private.Checkr && Meteor.settings.private.Checkr.apiKey) {
  Checkr = new Npm.require('checkr-api')(Meteor.settings.private.Checkr.apiKey);
} else {
  console.error('[Checkr] Error: No API Key configured!');
  throw new Meteor.Error(
    'No API Key',
    'No API Key configured',
    'Configure your API Key in settings.json or in a method call'
  );
};
