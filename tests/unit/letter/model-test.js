import { moduleForModel, test } from 'ember-qunit';

moduleForModel('letter', 'Unit | Model | letter', {
  // Specify the other units that are required for this test.
  needs: ['model:sent-to']
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});
