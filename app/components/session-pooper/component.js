import Ember from 'ember';

export default Ember.Component.extend({
  session: Ember.inject.service('session'),

  actions: {
    poop() {
      console.log(this.get('session.session'));
    }
  }
});
