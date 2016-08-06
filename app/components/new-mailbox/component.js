import Ember from 'ember';

let {
  assign
} = Ember;

export default Ember.Component.extend({
  manager: Ember.inject.service('account-manager'),

  actions: {
    createMailbox() {
      let requestOptions = {};
      let data = {};
      let this2 = this;
      data["name"] = this.get('nickname');
      data["session"] = this.get("manager").getSessionString();

      assign(requestOptions, {
        url:      "api/v1/mailbox",
        type:     'POST',
        dataType: 'json',
        data,
        beforeSend(xhr, settings) {
          xhr.setRequestHeader('Accept', settings.accepts.json);
        }
      });

      assign(requestOptions, {});

      return jQuery.ajax(requestOptions).then(() => {
        this.sendAction('reloadModel');
        this.sendAction('goToMailboxList');
      });
    }
  }
});
