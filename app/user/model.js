import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { hasMany, belongsTo } from 'ember-data/relationships';

export default Model.extend({
  firstName: attr('string'),
  lastName: attr('string'),
  email: attr('string'),
  mailboxes: hasMany('mailbox', {
    inverse: 'user'
  }),
  addressBookFriends: hasMany('address-book-friend', {
    inverse: 'user'
  })
});
