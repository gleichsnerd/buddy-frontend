import Ember from 'ember';

let {
  isEmpty,
  get
} = Ember;

export default Ember.Route.extend({

  model: function() {
    return this.store.peekAll('address-book-friend');
  }

});
