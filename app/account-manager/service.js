import Ember from 'ember';

let {
  get,
  assign,
  isEmpty,
  run
} = Ember;

export default Ember.Service.extend({
  session: Ember.inject.service('session'),
  serverCreateAccountEndpoint: '/users',

  authenticate(params) {
    return this.get('session').authenticate('authenticator:devise', params);
  },

  createAccount(params) {
    return new Promise((resolve, reject) => {
      const useXhr = this.get('rejectWithXhr');
      const data = {};

      let self = this;

      data["email"] = get(params, "email");
      data["password"] = get(params, "password");
      data["password_confirmation"] = get(params, "password_confirmation");

      debugger;
      if(!isEmpty(get(params, "first_name"))) {
        data["first_name"] = get(params, "first_name");
      }

      if(!isEmpty(get(params, "last_name"))) {
        data["last_name"] = get(params, "last_name");
      }

      return this.makeRequest(this.get("serverCreateAccountEndpoint"), data).then(
        (response) => {
            if (self.validate(response)) {
              let authParams = {
                "email": get(params, "email"), 
                "password": get(params, "password")
              };
              self.authenticate(authParams).then(
                (response) => {
                  run(null, resolve, response);
                });
            } else {
              run(null, reject, response);
            }
        }
      )
    });
  },

  makeRequest(endpoint, data, options) {
    let requestOptions = {};
    assign(requestOptions, {
      url:      endpoint,
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

  validate(data) {
    const tokenAttributeName = "token";
    const idAttributeName = "id";
    const resourceName = "session";
    const _data = data[resourceName] ? data[resourceName] : data;

    return !isEmpty(_data[tokenAttributeName]) && !isEmpty(_data[idAttributeName]);
  }
});
