import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

let {
  inject,
  isEmpty,
  get
} = Ember;

export default Ember.Route.extend(AuthenticatedRouteMixin, {

  manager: inject.service('account-manager'),

  model() {
    return this.get("store").findAll('mailbox').then(mailboxes => {
      return mailboxes.filterBy("user.id", this.get("manager").getUserId().toString());
    }).catch(
      (response) => {
        if(!isEmpty(get(response, "errors")) && get(response, "errors.0.status") === "500") {
          this.transitionTo("logout");
        }
    });  
  },

  actions: {
    reloadModel() {
      this.model(); 
    }
  }

});
