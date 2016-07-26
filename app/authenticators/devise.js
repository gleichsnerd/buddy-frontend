import Ember from 'ember';
import BaseAuthenticator from 'ember-simple-auth/authenticators/base';

const { RSVP: { Promise }, isEmpty, run, $: jQuery, assign: emberAssign, merge } = Ember;
const assign = emberAssign || merge;

/**
  Authenticator that works with the Ruby gem
  [devise](https://github.com/plataformatec/devise).

  __As token authentication is not actually part of devise anymore, the server
  needs to implement some customizations__ to work with this authenticator -
  see [this gist](https://gist.github.com/josevalim/fb706b1e933ef01e4fb6).

  @class DeviseAuthenticator
  @module ember-simple-auth/authenticators/devise
  @extends BaseAuthenticator
  @public
*/
export default BaseAuthenticator.extend({
  /**
    The endpoint on the server that the authentication request is sent to.

    @property serverTokenEndpoint
    @type String
    @default '/users/sign_in'
    @public
  */
  serverTokenEndpoint: '/users/sign_in',

  /**
    The devise resource name. __This will be used in the request and also be
    expected in the server's response.__

    @property resourceName
    @type String
    @default 'user'
    @public
  */
  resourceName: 'session',

  /**
    The token attribute name. __This will be used in the request and also be
    expected in the server's response.__

    @property tokenAttributeName
    @type String
    @default 'token'
    @public
  */
  tokenAttributeName: 'token',

  /**
    The identification attribute name. __This will be used in the request and
    also be expected in the server's response.__

    @property identificationAttributeName
    @type String
    @default 'email'
    @public
  */
  identificationAttributeName: 'email',

  idAttributeName: 'id',

  /**
    When authentication fails, the rejection callback is provided with the whole
    XHR object instead of it's response JSON or text.

    This is useful for cases when the backend provides additional context not
    available in the response body.

    @property rejectWithXhr
    @type Boolean
    @default false
    @public
  */
  rejectWithXhr: false,

  /**
    Restores the session from a session data object; __returns a resolving
    promise when there are non-empty
    {{#crossLink "DeviseAuthenticator/tokenAttributeName:property"}}token{{/crossLink}}
    and
    {{#crossLink "DeviseAuthenticator/identificationAttributeName:property"}}identification{{/crossLink}}
    values in `data`__ and a rejecting promise otherwise.

    @method restore
    @param {Object} data The data to restore the session from
    @return {Ember.RSVP.Promise} A promise that when it resolves results in the session becoming or remaining authenticated
    @public
  */
  restore(data) {
    return this._validate(data) ? Promise.resolve(data) : Promise.reject();
  },

  /**
    Authenticates the session with the specified `identification` and
    `password`; the credentials are `POST`ed to the
    {{#crossLink "DeviseAuthenticator/serverTokenEndpoint:property"}}server{{/crossLink}}.
    If the credentials are valid the server will responds with a
    {{#crossLink "DeviseAuthenticator/tokenAttributeName:property"}}token{{/crossLink}}
    and
    {{#crossLink "DeviseAuthenticator/identificationAttributeName:property"}}identification{{/crossLink}}.
    __If the credentials are valid and authentication succeeds, a promise that
    resolves with the server's response is returned__, otherwise a promise that
    rejects with the server error is returned.

    @method authenticate
    @param {String} identification The user's identification
    @param {String} password The user's password
    @return {Ember.RSVP.Promise} A promise that when it resolves results in the session becoming authenticated
    @public
  */
  authenticate(identification, password) {
    return new Promise((resolve, reject) => {
      const useXhr = this.get('rejectWithXhr');
      const { resourceName, identificationAttributeName, tokenAttributeName } = this.getProperties('resourceName', 'identificationAttributeName', 'tokenAttributeName');
      const data         = {};
      data[resourceName] = { password };
      data[resourceName][identificationAttributeName] = identification;

      return this.makeRequest(data).then(
        (response) => {
          if (this._validate(response)) {
            const resourceName = this.get('resourceName');
            const _response = response[resourceName] ? response[resourceName] : response;
            run(null, resolve, _response);
          } else {
            run(null, reject, `Check that server response includes ${tokenAttributeName} and ${idAttributeName}`);
          }
        },
        (xhr) => run(null, reject, useXhr ? xhr : (xhr.responseJSON || xhr.responseText))
      );
    });
  },

  /**
    Does nothing

    @method invalidate
    @return {Ember.RSVP.Promise} A resolving promise
    @public
  */
  invalidate() {
    return Promise.resolve();
  },

  /**
    Makes a request to the devise server.

    @method makeRequest
    @param {Object} data The request data
    @param {Object} options Ajax configuration object merged into argument of `$.ajax`
    @return {jQuery.Deferred} A promise like jQuery.Deferred as returned by `$.ajax`
    @protected
  */
  makeRequest(data, options) {
    const serverTokenEndpoint = this.get('serverTokenEndpoint');
    let requestOptions = {};
    assign(requestOptions, {
      url:      serverTokenEndpoint,
      type:     'POST',
      dataType: 'json',
      data,
      beforeSend(xhr, settings) {
        xhr.setRequestHeader('Accept', settings.accepts.json);
      }
    });
    assign(requestOptions, options || {});

    return jQuery.ajax(requestOptions);
  },

  _validate(data) {
    const tokenAttributeName = this.get('tokenAttributeName');
    const idAttributeName = this.get('idAttributeName');
    const resourceName = this.get('resourceName');
    const _data = data[resourceName] ? data[resourceName] : data;

    return !isEmpty(_data[tokenAttributeName]) && !isEmpty(_data[idAttributeName]);
  }
});