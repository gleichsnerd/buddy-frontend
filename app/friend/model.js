import DS from 'ember-data';
import attr from 'ember-data/attr';

export default DS.Model.extend({
  firstName: attr('string'),
  lastName: attr('string')
});
