import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  session: Ember.inject.service('session'),

  beforeModel() {
    console.log("Logging out");

    this.get("session").invalidate();
    this.transitionTo('application')
  }
});
