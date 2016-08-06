import Ember from 'ember';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';

let {
  isEmpty,
  inject,
  Route,
  get,
  RSVP: { Promise }
} = Ember;

export default Route.extend(ApplicationRouteMixin, {

  session: inject.service('session'),
  manager: inject.service('account-manager'),

  model: function() {
    if (this.get("manager").isAuthenticated()) {
      return this.get("store").findRecord('user', this.get("manager").getUserId()).catch(
          (response) => {
            if(!isEmpty(get(response, "errors")) && get(response, "errors.0.status") === "500") {
              this.transitionTo("logout");
            }
          });
    }
  // return new Promise(function(resolve, reject) {/*I'm a dummy*/});
  },

  actions: {
    didTransition() {
      if(this.get("manager").isAuthenticated()) {
        this.model();
      }
    }
  }
});
