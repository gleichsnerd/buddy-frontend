import Ember from 'ember';

export default Ember.Component.extend({
  session: Ember.inject.service('session'),
  store: Ember.inject.service('store'),

  data: null,

  actions: {
    poop() {
      // console.log(this.get('session.session'));
      let user = this.get("store").peekRecord('user', this.get("session.session.content.authenticated.id"));//.then((data) => {

      this.set("data", user);
        // this.set("data", data);
      // }).then(() => {
        console.log(this.get("data"));
      // });
    }
  }
});
