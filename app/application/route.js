import Ember from 'ember';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';

export default Ember.Route.extend(ApplicationRouteMixin, {

  session: Ember.inject.service('session'),

  model: function() {
    if (this.get("session.session.isAuthenticated")) {
      return this.get("store").findRecord('user', this.get("session.session.content.authenticated.id"));
    }

    return Ember.A();
  }
});
