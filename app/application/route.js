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
      return this.get("store").findRecord('user', this.get("manager").getUserId()).then(
        (user) => {
          //Get all of your mailboxes
          this.store.findAll('mailbox');

          //Get all of your friends
          this.store.findAll('address-book-friend').then(addressBookFriends => {
            addressBookFriends.forEach(addressBookFriend => {
              //Get the reduced user models for your friends
              this.store.findRecord('user', addressBookFriend.get("friend.id"));
            })
          });
          //Get all of the address book entries for your friends
          this.store.findAll('address-book-friend-record').then(records => {
            records.forEach(record => {
              //Get the mailbox for each entry
              this.store.findRecord('mailbox', record.get("mailbox.id"));
            })
          });
        },                                                                              
        (response) => {
          if(!isEmpty(get(response, "errors")) && get(response, "errors.0.status") === "500") {
            this.transitionTo("logout");
          }
        }
      );
    }
  // return new Promise(function(resolve, reject) {/*I'm a dummy*/});
  },

  actions: {
    didTransition() {
      if(this.get("manager").isAuthenticated()) {
        if(this.store.peekRecord('user', this.get("manager").getUserId()) === null) {
          this.model();
        }
      }
    }
  }
});
