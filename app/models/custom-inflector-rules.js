import Inflector from 'ember-inflector';

const inflector = Inflector.inflector;

// inflector.irregular('formula', 'formulae');
// inflector.uncountable('advice');
inflector.uncountable('mailbox_collection');
inflector.uncountable('mailbox');
inflector.uncountable('address_book');

// Meet Ember Inspector's expectation of an export
export default {};