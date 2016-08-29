import DS from 'ember-data';
import { belongsTo, hasMany } from 'ember-data/relationships';

export default DS.Model.extend({
  user: belongsTo("user"),
  friend: belongsTo("user"),
  addressBookFriendRecords: hasMany('address-book-friend-record')
});
