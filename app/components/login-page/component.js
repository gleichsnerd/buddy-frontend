import Ember from 'ember';

export default Ember.Component.extend({
  accountManager: Ember.inject.service('account-manager'),

  actions: {
    authenticate() {
      let { identification, password } = this.getProperties('identification', 'password');
      let params = {
        "email": identification,
        "password": password
      };

      this.get('accountManager').authenticate(params);
    }
  }
});
