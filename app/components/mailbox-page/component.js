import Ember from 'ember';

export default Ember.Component.extend({
  isMailboxList: true,

  actions: {
    goToNewMailbox() {
      this.set("isMailboxList", false);
    },

    goToMailboxList() {
      this.set("isMailboxList", true)
    }
  }
});
