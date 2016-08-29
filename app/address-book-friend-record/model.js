import DS from 'ember-data';
import { belongsTo, hasMany } from 'ember-data/relationships';

export default DS.Model.extend({
  addressBookFriend: belongsTo('address-book-friend'),
  mailbox: belongsTo('mailbox')
});
