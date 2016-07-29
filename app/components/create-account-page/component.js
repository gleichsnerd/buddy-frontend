import Ember from 'ember';

export default Ember.Component.extend({

  accountManager: Ember.inject.service('account-manager'),

  actions: {
    createAccount() {
      let {
        first_name, 
        last_name, 
        email, 
        password, 
        password_confirmation
      } = this.getProperties('first_name', 'last_name', 'email', 'password', 'password_confirmation');
      
      let params = {
        "first_name": first_name,
        "last_name": last_name,
        "email": email,
        "password": password,
        "password_confirmation": password_confirmation,
      };

      this.get("accountManager").createAccount(params).then(
        (response) => {
          console.log("Account created");
        },

        (reason) => {
          this.set('errorMessage', reason.error || reason);
        }
      );
    }
  }

});
