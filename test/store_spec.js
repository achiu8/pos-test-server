import { expect } from 'chai';
import { Map, fromJS } from 'immutable';

import makeStore from '../src/store';

describe('store', () => {
  it('is a Redux store configured with the correct reducer', () => {
    const store = makeStore();
    const entries = ['foo', 'bar'];
    const action = { type: 'SET_ENTRIES', entries: entries };
    
    expect(store.getState()).to.equal(Map());

    store.dispatch(action);

    expect(store.getState()).to.equal(fromJS({ entries: entries }));
  });
});
