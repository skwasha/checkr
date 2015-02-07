var getSettingsValueFor = function(key) {
  if (Meteor.settings && Meteor.settings.private && Meteor.settings.private.Checkr) {
    return Meteor.settings.private.Checkr[key];
  }
};

Checkr = function(apiKey) {
  var checkrOptions = {
    'apiKey'  : apiKey || getSettingsValueFor('apiKey')
  };

  if (!chekrOptions.apiKey || checkrOptions.apiKey === '') {
    console.error('[Checkr] Error: No API Key configured!');

    throw new Meteor.Error(
      'No API Key',
      'No API Key configured',
      'Configure your API Key in settings.json or in a method call'
    );
  }

  this._asyncAPI = Npm.require('checkr-api').CheckrAPI(
    checkrOptions.apiKey
  );
};

Checkr.prototype.call = function ( section, method, options, callback ) {
	if ( callback && typeof callback === 'function' ) {
		// If anyone still wants to use old-fashioned callback method
		this._asyncAPI.call( section, method, options, callback );
	} else {
		try {
			var wrapped = Meteor.wrapAsync( this._asyncAPI.call, this._asyncAPI );

			return wrapped( section, method, options );
		} catch ( error ) {
			// A workaround for:
			// https://github.com/meteor/meteor/issues/2774
			if ( !error.error ) {
				throw new Meteor.Error( error.code, error.message );
			} else {
				throw new Meteor.Error( error );
			}
		}
	}
};

Meteor.methods({
  'Checkr': function(clientOptions, section, method, options) {
    check(clientOptions, Object);
    check(section, String);
    check(method, String);
    check(options, Object);

    var checkr,
      checkrOptions = _.defaults({}, options);

    try {
      checkr = new Checkr(clientOptions.apiKey, clientOptions.options);
    } catch (error) {
      throw new Meteor.Error(error.error, error.reason, error.details);
    }

    switch (section) {
      case 'candidates':
        if (!checkrOptions.id || checkrOptions.id === '') {
          checkrOptions.id = getSettingsValueFor('candidateId');
        }

        break;
      default:
    }

    return checkr.call(section, method, checkrOptions);
  }
});
