import DS from 'ember-data';

export default DS.Model.extend({
  subject: DS.attr('string'),
  content: DS.attr('string'),
  sentTo: DS.belongsTo('sent-to'),
  sentFrom: DS.belongsTo('sent-from'),
});
