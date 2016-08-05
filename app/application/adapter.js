import JSONAPIAdapter from 'ember-data/adapters/json-api';
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';
import Ember from 'ember';
import DS from 'ember-data';

export default JSONAPIAdapter.extend(DataAdapterMixin, DS.EmbeddedRecordsMixin, {

  authorizer: 'authorizer:custom',

  pathForType: function(type) {
    return Ember.String.pluralize(Ember.String.underscore(type));
  }

});
